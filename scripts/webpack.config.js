const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const isStart = process.env.npm_lifecycle_event.includes('start');

let env = process.env.NODE_ENV;
if (env !== 'production') {
  env = 'develop';
}

function noop() {}

module.exports = {
  context: __dirname,
  entry: {
    index: ['./../src/js/index.js'],
    'mobile-index': ['./../src/js/mobile-index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: env === 'production' ? 'js/[name].js?[hash:8]' : 'js/[name].js',
    //filename: 'js/[name].js?[hash:8]',
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    open: false,
    port: 7000,
  },
  resolve: {
    alias: {
      comp: path.resolve(__dirname, '../src/components/'),
      css: path.resolve(__dirname, '../src/css'),
    },
  },
  plugins: [
    isStart ? noop : new CleanWebpackPlugin(
      [path.resolve(__dirname, './../dist')],
        { root: path.resolve(__dirname, '../') }
    ),
    isStart ? noop : new UglifyjsPlugin({
      exclude: /(node_modules)/,
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true,
        },
      },
    }),
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['index', 'mobile-index'],
      minChunks: 2, // 提取所有chunks共同依赖的模块
    }),
    new ExtractTextPlugin('css/[name].css?[contenthash:8]', {
      // allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './../src/index.html',
      chunks: ['common', 'index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'mobile-index.html',
      template: './../src/mobile-index.html',
      chunks: ['common', 'mobile-index'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['es2015', { modules: false }]],
            plugins: ['syntax-dynamic-import', 'transform-runtime'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: env === 'production',
            interpolate: true,
          },
        }],
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: env === 'production',
                import: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                import: true,
                includePaths: [
                  `${path.resolve('./')}/src/css`,
                ],
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')(),
                ],
              }
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              useRelativePath: false,
              name: env === 'production' ? '[name]-[hash:8].[ext]' : '[name].[ext]',
              outputPath: 'assets/',
              publicPath: '/',
            },
          },
        ],
      },
    ],
  },
};
