import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { GenerateSW } from 'workbox-webpack-plugin';
import { WebpackPluginInstance, EntryObject } from 'webpack';
import pages from './src/config/pages';
import Config from './src/Config';

const config = Config.get()

export default (env: any, argv: { mode: string; }) => {
  /** @type {boolean} */
  const isProd: boolean = argv.mode === 'production';

  const webpackConfig = {
    devServer: {
      index: 'index.html',
      clientLogLevel: 'error',
      // before: server,
      contentBase: [
        path.resolve(__dirname, './src/templates'),
      ],
      hot: true,
      inline: true,
      watchContentBase: true,
    },
    devtool: isProd ? false : 'source-map',
    entry: {
      main: isProd
        ? [
          resolveTemplate(config.global.template, 'index.ts'),
          resolveTemplate(config.global.template, 'index.scss'),
        ]
        : resolveTemplate('_autoload', 'index.ts'),
    } as EntryObject,
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
          { from: 'public', to: 'public' },
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
          ? resolveTemplate(config.global.template, 'index.ejs')
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
    // webpackConfig.plugins.push(
    //   new CleanWebpackPlugin(),
    //   new WebpackPwaManifest({
    //     background_color: '#fff',
    //     description: `Portfolio by ${config.data.first_name} ${config.data.last_name}`,
    //     filename: 'static/manifest.[hash].json',
    //     icons: [
    //       {
    //         destination: 'static/icons',
    //         sizes: [96, 128, 192, 256, 384, 512],
    //         src: path.resolve(__dirname, './src/assets/project/icon.png'),
    //       },
    //     ],
    //     name: `${config.data.first_name} ${config.data.last_name}`,
    //     short_name: `${config.data.first_name} ${config.data.last_name}`,
    //     start_url: Config.siteUrl(),
    //     theme_color: '#fff',
    //     ...config.global.pwa,
    //   }) as WebpackPluginInstance, // https://github.com/arthurbergmz/webpack-pwa-manifest/pull/151
    //   new GenerateSW({
    //     clientsClaim: true,
    //     exclude: [
    //       /\.gitignore/, /_cache\//,
    //     ],
    //     importsDirectory: 'static/pwa',
    //     navigateFallback: '/index.html',
    //     navigateFallbackAllowlist: [
    //       /^static/, /^public/, /^sw\.js$/, /^index\.html$/, /^favicon\.ico$/,
    //     ],
    //     runtimeCaching: [{
    //       handler: 'StaleWhileRevalidate',
    //       options: {
    //         cacheName: 'github-content',
    //       },
    //       urlPattern: new RegExp('^https:\/\/.*\.githubusercontent\.com\/'),
    //     }, {
    //       handler: 'NetworkFirst',
    //       options: {
    //         cacheName: 'github-api',
    //       },
    //       urlPattern: new RegExp('^https:\/\/api\.github\.com\/'),
    //     }, {
    //       handler: 'StaleWhileRevalidate',
    //       options: {
    //         cacheName: 'other-websites',
    //       },
    //       urlPattern: new RegExp('.+'),
    //     }],
    //     skipWaiting: true,
    //     swDest: 'sw.js',
    //   }),
    // );
  } else {
    for (const page of pages) {
      webpackConfig.entry[page.name()] = [
        page.entryScript(), page.entryStyle(),
      ];
      webpackConfig.plugins.push(
        new HtmlWebpackPlugin(page.htmlWebpackOptions())
      );
    }
  }

  return webpackConfig;
};

function resolveTemplate(name: string, file: string) {
  return `./src/templates/${name}/${file}`
}
