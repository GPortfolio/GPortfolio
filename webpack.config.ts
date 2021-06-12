import 'reflect-metadata';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { GenerateSW } from 'workbox-webpack-plugin';
import fs from 'fs';
import { WebpackPluginInstance, Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { di } from './src/di';
import Server from './src/modules/server/Server';
import IApplication from './src/interfaces/IApplication';
import TYPES from './src/types';

function resolvePage(name: string, file: string) {
  return `./src/pages/${name}/${file}`;
}

function resolveTemplate(name: string, file: string) {
  return `./src/templates/${name}/${file}`;
}

const { config, url } = di.get<IApplication>(TYPES.Application);

export default (env: any, argv: { mode: string; }): Configuration => {
  const isProd: boolean = argv.mode === 'production';

  const webpackConfig: Configuration = {
    devServer: {
      index: 'index.html',
      clientLogLevel: 'info',
      before: new Server().run,
      contentBase: [
        path.resolve(__dirname, './src'),
      ],
      hot: true,
      inline: true,
      watchContentBase: true,
    } as DevServerConfiguration,
    devtool: isProd ? false : 'source-map',
    entry: {
      main: isProd
        ? [
          resolveTemplate(config.template, 'index.ts'),
          resolveTemplate(config.template, 'index.scss'),
        ]
        : resolveTemplate('_autoload', 'index.ts'),
    },
    mode: isProd ? 'production' : 'development',
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
        {
          test: /\.ejs$/,
          loader: 'ejs-loader',
          options: {
            esModule: false,
          },
        },
      ],
    },
    output: {
      chunkFilename: 'static/js/[name].[fullhash].js',
      filename: 'static/[name].[fullhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/export/', to: 'public/' },
          { from: 'public/favicon.ico', noErrorOnMissing: true },
        ],
      }),
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
          ? resolveTemplate(config.template, 'index.ejs')
          : resolveTemplate('_autoload', 'index.ejs'),
        templateParameters: {
          isProd,
        },
      }),
      new MiniCssExtractPlugin({
        chunkFilename: 'static/css/[name].[fullhash].css',
        filename: 'static/[name].[fullhash].css',
      }),
    ] as WebpackPluginInstance[],
    resolve: {
      alias: {
        '@root': __dirname,
        '@src': path.resolve(__dirname, './src'),
      },
      extensions: [
        '.ts', '.js', '.json',
      ],
    },
  };

  if (isProd) {
    // @ts-ignore
    webpackConfig.plugins.push(
      new CleanWebpackPlugin(),
      new WebpackPwaManifest({
        background_color: '#fff',
        description: `Portfolio by ${config.data.first_name} ${config.data.last_name}`,
        filename: 'static/manifest.[hash].json',
        icons: [
          {
            destination: 'static/icons',
            sizes: [96, 128, 192, 256, 384, 512],
            src: path.resolve(__dirname, './src/assets/project/icon.png'), // TODO config.data.avatar
          },
        ],
        name: `${config.data.first_name} ${config.data.last_name}`,
        short_name: `${config.data.first_name} ${config.data.last_name}`,
        start_url: url,
        theme_color: '#fff',
        ...config.global.pwa,
      }) as WebpackPluginInstance, // https://github.com/arthurbergmz/webpack-pwa-manifest/pull/151
      new GenerateSW({
        clientsClaim: true,
        exclude: [
          /\.gitignore/,
        ],
        navigateFallback: '/index.html',
        navigateFallbackAllowlist: [
          /^static/, /^public/, /^sw\.js$/, /^index\.html$/, /^favicon\.ico$/,
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
  } else {
    fs.readdirSync(path.resolve(__dirname, './src/pages'))
      .forEach((folder: string) => {
        // @ts-ignore
        webpackConfig.entry[folder] = [
          resolvePage(folder, 'index.ts'),
          resolvePage(folder, 'index.scss'),
        ];

        // @ts-ignore
        webpackConfig.plugins.push(
          new HtmlWebpackPlugin({
            filename: `${folder}.html`,
            inject: 'head',
            chunks: [folder],
            template: resolvePage(folder, 'index.ejs'),
          }),
        );
      });
  }

  if (config.webpack) {
    config.webpack(webpackConfig);
  }

  return webpackConfig;
};
