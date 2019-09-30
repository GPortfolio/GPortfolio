/* tslint:disable:no-implicit-dependencies */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { GenerateSW } from 'workbox-webpack-plugin';

/**
 * Load .env file
 * @example
 *  process.env.GITHUB_TOKEN
 */
if (fs.existsSync(path.resolve(__dirname, '.env'))) {
  dotenv.config();
}

import config from './config';
import transformConfigData from './core/helpers/transformConfigData';
import validateConfig from './core/helpers/validateConfig';
import collectModules from './core/modules';
import variables from './core/variables';

export default async (env: any, argv: { mode: string; }) => {

  /**
   * Check that the required data has been entered
   * @throws
   */
  validateConfig();

  /**
   * Fetch data from all social media
   * And then inject all data to .ejs
   * @throws
   */
  const modules = await collectModules();

  /**
   * Change data from settings to data from social networks
   * @see see docs/config.md #Data
   */
  transformConfigData(config.data, modules);

  /** @type {string} */
  const template: string = config.global.template || 'default';

  /** @type {boolean} */
  const isProd: boolean = argv.mode === 'production';

  const webpackConfig = {
    devServer: {
      clientLogLevel: 'error',
      contentBase: [path.resolve(__dirname, `./src/templates/${template}/index.ejs`)],
      hot: true,
      inline: true,
      watchContentBase: true,
    },
    devtool: isProd ? false : 'source-map',
    entry: {
      main: [
        `./src/templates/${template}/index.ts`,
        `./src/templates/${template}/index.scss`,
      ],
    },
    mode: argv.mode,
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static/images',
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static/files',
              },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'resolve-url-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.ts$/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    output: {
      chunkFilename: 'static/js/[name].[hash].js',
      filename: 'static/[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      /**
       * Remove build folder(s) before building.
       * @see https://github.com/johnagan/clean-webpack-plugin
       */
      new CleanWebpackPlugin(),
      /**
       * Copies individual files or entire directories to the build directory.
       * @see https://github.com/webpack-contrib/copy-webpack-plugin
       */
      new CopyWebpackPlugin((() => {
        const output = [];

        // Upload config.ts to dist folder for save all config data
        if (process.env.UPLOAD_CONFIG === 'true') {
          output.push({ from: 'config.ts', to: '_cache', ignore: [] });
        }

        return [
          ...output,
          { from: 'public', ignore: ['.gitignore'] },
        ];
      })()),
      /**
       * Simplifies creation of HTML files to serve your webpack bundles.
       * @see https://github.com/jantimon/html-webpack-plugin
       * @example
       *  In the .ejs file you can get a profile and repositories from GitHub.
       *    Example: htmlWebpackPlugin.options.modules.github.profile
       *  Get a variable:
       *    <% if (htmlWebpackPlugin.options.modules.github.profile.id === 1) { /\* code *\/ } %>
       *  Insert data from a variable:
       *    <%= htmlWebpackPlugin.options.modules.github.profile.id %>
       */
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'head',
        meta: {
          description: `Portfolio by ${modules.github.profile.name}`,
          robots: 'index, follow',
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        minify: isProd ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        } : false,
        template: `./src/templates/${template}/index.ejs`,
        templateParameters: {
          config,
          isProd,
          modules,
          url: variables.siteUrl,
        },
      }),
      /**
       * Creates a CSS file per JS/TS file which contains CSS
       * @see https://github.com/webpack-contrib/mini-css-extract-plugin
       */
      new MiniCssExtractPlugin({
        chunkFilename: 'static/css/[name].[hash].css',
        filename: 'static/[name].[hash].css',
      }),
    ],
    resolve: {
      /**
       * @see https://webpack.js.org/configuration/resolve/
       * @example
       *  Import from .ts files
       *  - import '@/main' - get file './src/template/{template}/main.ts'
       *  - import '@/styles/index.scss' - get file './src/template/{template}/styles/index.scss'
       *  Import from .scss files
       *  - @import "@/styles/index"; - get file './src/template/{template}/styles/index.scss'
       *
       *  {template} - insert the path of the current template, for example - default
       */
      alias: {
        '@': path.resolve(__dirname, `./src/templates/${template}/`),
        '@asset': path.resolve(__dirname, './assets/'),
        '@root': __dirname,
        '@src': path.resolve(__dirname, './src'),
      },
      /**
       * Attempt to resolve these extensions in order
       */
      extensions: [
        '.ts', '.js', '.json',
      ],
    },
  };

  if (isProd) {
    /**
     * Add all folders and files to navigateFallbackWhitelist (PWA)
     * @type {RegExp[]}
     */
    const ignorePublicFolder: RegExp[] = fs.readdirSync(path.resolve(__dirname, './public'))
      .map((pathDir: string) => {
        if (fs.lstatSync('./public/' + pathDir).isDirectory()) {
          return new RegExp('^' + pathDir);
        }

        return new RegExp('^' + pathDir.replace(/\./g, '\\.') + '$');
      });

    webpackConfig.plugins.push(
      /**
       * Progressive Web App Manifest Generator for Webpack,
       * with auto icon resizing and fingerprinting support.
       * @see https://github.com/arthurbergmz/webpack-pwa-manifest
       */
      new WebpackPwaManifest({
        ...{
          background_color: '#fff',
          description: `Portfolio by ${modules.github.profile.name}`,
          filename: 'static/manifest.[hash].json',
          icons: [
            {
              destination: 'static/icons',
              sizes: [96, 128, 192, 256, 384, 512],
              src: path.resolve('demo/icon.png'),
            },
          ],
          name: `${modules.github.profile.name}`,
          short_name: config.modules.github.username,
          start_url: variables.siteUrl,
          theme_color: '#fff',
        },
        ...config.global.pwa,
      }),
      /**
       * Workbox is a collection of JavaScript libraries for Progressive Web Apps.
       * @see https://github.com/googlechrome/workbox
       */
      new GenerateSW({
        clientsClaim: true,
        exclude: [
          /\.gitignore/, /_cache\//,
        ],
        importWorkboxFrom: 'local',
        importsDirectory: 'static/pwa',
        navigateFallback: '/index.html',
        navigateFallbackWhitelist: [
          // Output build
          /^static/, /^sw\.js$/, /^index\.html$/, /^favicon\.ico$/,
          // Public folder
          ...ignorePublicFolder,
        ],
        runtimeCaching: [{
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'github-content',
          },
          urlPattern: new RegExp('^https:\/\/.*\.githubusercontent\.com\/'),
        }, {
          handler: 'NetworkFirst',
          options: {
            cacheName: 'github-api',
          },
          urlPattern: new RegExp('^https:\/\/api\.github\.com\/'),
        }, {
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'other-websites',
          },
          urlPattern: new RegExp('.+'),
        }],
        skipWaiting: true,
        swDest: 'sw.js',
      }),
    );
  }

  return webpackConfig;
};
