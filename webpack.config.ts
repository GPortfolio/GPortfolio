/* eslint-disable import/no-extraneous-dependencies */

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { GenerateSW } from 'workbox-webpack-plugin';
import siteUrl from './core/config/siteUrl';
import server from './core/server';
import config from './core/config';

/**
 * Load .env file for change environment
 * @example
 *  process.env.APP_DEMO
 */
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

export default async (env: any, argv: { mode: string; }) => {
  /** @type {boolean} */
  const isProd: boolean = argv.mode === 'production';

  const webpackConfig = {
    devServer: {
      index: 'index.html',
      clientLogLevel: 'error',
      before: server,
      contentBase: [
        path.resolve(__dirname, './src/templates'),
        path.resolve(__dirname, './core/config/accounts'),
      ],
      hot: true,
      inline: true,
      watchContentBase: true,
    },
    devtool: isProd ? false : 'source-map',
    entry: {
      main: isProd
        ? [
          `./src/templates/${config.global.template}/index.ts`,
          `./src/templates/${config.global.template}/index.scss`,
        ]
        : './src/autoload/index.ts',
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
       * Copies individual files or entire directories to the build directory.
       * @see https://github.com/webpack-contrib/copy-webpack-plugin
       */
      new CopyWebpackPlugin([
        { from: 'public', ignore: ['.gitignore'] },
      ]),
      /**
       * Simplifies creation of HTML files to serve your webpack bundles.
       * @see https://github.com/jantimon/html-webpack-plugin
       * @example
       *  In the .ejs file you can get a profile and repositories from GitHub.
       *    Example: htmlWebpackPlugin.options.websites.github.profile
       *  Get a variable:
       *    <% if (htmlWebpackPlugin.options.websites.github.profile.id === 1) { /\* code *\/ } %>
       *  Insert data from a variable:
       *    <%= htmlWebpackPlugin.options.websites.github.profile.id %>
       */
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'head',
        chunks: ['main'],
        meta: {
          description: `Portfolio by ${config.data.first_name} ${config.data.last_name}`,
          robots: 'index, follow',
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          ...config.global.meta,
        },
        minify: isProd ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        } : false,
        template: isProd
          ? `!!ejs-loader!./src/templates/${config.global.template}/index.ejs`
          : '!!ejs-loader!./src/autoload/index.ejs',
        templateParameters: {
          isProd,
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
       *  - import '@/styles/index.scss' - get file './src/template/{template}/styles/index.scss'
       *  Import from .scss files
       *  - @import "@/styles/index"; - get file './src/template/{template}/styles/index.scss'
       *
       *  {template} - insert the path of the current template, for example - default
       */
      alias: {
        '@asset': path.resolve(__dirname, './assets/'),
        '@root': __dirname,
        '@src': path.resolve(__dirname, './src'),
        '@t': path.resolve(__dirname, './src/templates'),
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
        if (fs.lstatSync(`./public/${pathDir}`).isDirectory()) {
          return new RegExp(`^${pathDir}`);
        }

        return new RegExp(`^${pathDir.replace(/\./g, '\\.')}$`);
      });

    webpackConfig.plugins.push(
      /**
       * Remove build folder(s) before building.
       * @see https://github.com/johnagan/clean-webpack-plugin
       */
      new CleanWebpackPlugin(),
      /**
       * Progressive Web App Manifest Generator for Webpack,
       * with auto icon resizing and fingerprinting support.
       * @see https://github.com/arthurbergmz/webpack-pwa-manifest
       */
      new WebpackPwaManifest({
        background_color: '#fff',
        description: `Portfolio by ${config.data.first_name} ${config.data.last_name}`,
        filename: 'static/manifest.[hash].json',
        icons: [
          {
            destination: 'static/icons',
            sizes: [96, 128, 192, 256, 384, 512],
            src: path.resolve('demo/icon.png'),
          },
        ],
        name: `${config.data.first_name} ${config.data.last_name}`,
        short_name: `${config.data.first_name} ${config.data.last_name}`,
        start_url: siteUrl,
        theme_color: '#fff',
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
          /* eslint-disable-next-line no-useless-escape */
          urlPattern: new RegExp('^https:\/\/.*\.githubusercontent\.com\/'),
        }, {
          handler: 'NetworkFirst',
          options: {
            cacheName: 'github-api',
          },
          /* eslint-disable-next-line no-useless-escape */
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
  } else {
    /*
     * Display an additional page for custom settings
     */
    (webpackConfig.entry as any).dev = [
      './src/dev/index.ts',
      './src/dev/index.scss',
    ];
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'dev.html',
        inject: 'head',
        chunks: ['dev'],
        template: '!!ejs-loader!./src/dev/index.ejs',
      }),
    );
  }

  return webpackConfig;
};
