const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
// const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
  };

  if (!isDev) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const plugins = () => {
  const config = [
    new HtmlWebpackPlugin({
      title: 'medical-ture.com',
      template: 'index.pug',
      filename: 'index.html',
      minify: {
        // collapseWhitespace: !isDev,
        collapseWhitespace: false,
      },
      inject: 'body',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      runtime: true,
    }),
    new ESLintWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ];

  if (!isDev) {
    config.push(
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'all',
        fileBlacklist: [/\.map/, /\.svg/, /\.png/, /\.jpg/],
      }),
    );

    // config.push(
    //   new HtmlCriticalWebpackPlugin({
    //     base: path.resolve(__dirname, 'dist'),
    //     src: 'index.html',
    //     dest: 'index-critical.html',
    //     inline: true,
    //     minify: true,
    //     extract: false,
    //     width: 1920,
    //     height: 912,
    //   }),
    // );
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  target: isDev ? 'web' : 'browserslist',
  entry: {
    main: [
      // '@babel/polyfill',
      './index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      '@img': path.resolve(__dirname, 'src/assets/images'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@js': path.resolve(__dirname, 'src/js'),
      '@com': path.resolve(__dirname, 'src/components'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: path.resolve(__dirname, 'src/components'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|webp|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]',
        },
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    // open: true,
    hot: true,
    watchFiles: ['src/**/*.html', 'src/**/*.pug'],
    port: 8080,
  },
};
