import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { GenerateSW } from 'workbox-webpack-plugin';
import config from './config';
import collectModules from './node/modules';
import variables from './node/variables';

export default async (env: any, argv: { mode: string; }) => {

  /*
   * Fetch data from all social media
   * And then inject all data to .ejs
   */
  const modules = await collectModules();

  /** @type {string} */
  const template: string = config.global.template || 'default';

  /** @type {boolean} */
  const isProd: boolean = argv.mode === 'production';

  // TODO Rewrite public copy system
  /** @type {string} */
  const iconPath: string = fs.existsSync('./assets/favicon.ico')
    ? './assets/favicon.ico'
    : './assets/upstream/favicon.ico';

  const webpackConfig = {
    mode: argv.mode,
    entry: {
      main: [
        `./src/templates/${template}/index.ts`,
        `./src/templates/${template}/index.scss`,
      ],
    },
    output: {
      filename: 'static/[name].[hash].js',
      chunkFilename: 'static/js/[name].[hash].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isProd ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'css-loader',
            'sass-loader',
          ],
        },
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
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(js|ts)$/,
          use: [
            'babel-loader',
          ],
        },
      ],
    },
    plugins: [
      /**
       * Remove build folder(s) before building.
       * @see https://github.com/johnagan/clean-webpack-plugin
       */
      new CleanWebpackPlugin,
      /**
       * Copies individual files or entire directories to the build directory.
       * @see https://github.com/webpack-contrib/copy-webpack-plugin
       */
      new CopyWebpackPlugin([
        { from: 'public', to: 'static/public' },
      ]),
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
        template: `./src/templates/${template}/index.ejs`,
        favicon: iconPath,
        inject: true,
        templateParameters: {
          config,
          modules,
          isProd,
          url: variables.siteUrl,
        },
        minify: isProd ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        } : false,
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          description: `Portfolio by ${modules.github.profile.name}`,
          robots: 'index, follow',
        },
      }),
      /**
       * Creates a CSS file per JS/TS file which contains CSS
       * @see https://github.com/webpack-contrib/mini-css-extract-plugin
       */
      new MiniCssExtractPlugin({
        filename: 'static/[name].[hash].css',
        chunkFilename: 'static/css/[name].[hash].css',
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
        '@src': path.resolve(__dirname, './src'),
        '@root': __dirname,
        '@asset': path.resolve(__dirname, './assets/'),
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
    webpackConfig.plugins.push(
      /**
       * Progressive Web App Manifest Generator for Webpack,
       * with auto icon resizing and fingerprinting support.
       * @see https://github.com/arthurbergmz/webpack-pwa-manifest
       */
      new WebpackPwaManifest({
        ...{
          filename: 'static/manifest.[hash].json',
          name: `${modules.github.profile.name}`,
          short_name: config.modules.github.username,
          start_url: variables.siteUrl,
          description: `Portfolio by ${modules.github.profile.name}`,
          theme_color: '#fff',
          background_color: '#fff',
          icons: [
            {
              src: path.resolve('assets/upstream/icon.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: 'static/icons',
            },
          ],
        },
        ...config.global.pwa,
      }),
      /**
       * Workbox is a collection of JavaScript libraries for Progressive Web Apps.
       * @see https://github.com/googlechrome/workbox
       */
      new GenerateSW({
        swDest: 'sw.js',
        importWorkboxFrom: 'local',
        importsDirectory: 'static/pwa',
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: '/index.html',
        navigateFallbackWhitelist: [
          // Output build
          /^static/, /^sw\.js$/, /^index\.html$/, /^favicon\.ico$/,
        ],
        exclude: [
          /\.gitignore/,
        ],
        runtimeCaching: [{
          urlPattern: new RegExp('^https://.*\.githubusercontent\.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'github-content',
          },
        }, {
          urlPattern: new RegExp('^https://api\.github\.com/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'github-api',
          },
        }, {
          urlPattern: new RegExp('.+'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'other-websites',
          },
        }],
      }),
    );
  }

  return webpackConfig;
};
