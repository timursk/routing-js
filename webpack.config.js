const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

const nothing = () => {};

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const isAnalyze = env.analyze;

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval',
    entry: ['./src/index.js'],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '/build'),
    },
    resolve: {

      alias: {
        '@': path.join(__dirname, 'src'),
        images: path.resolve(__dirname, 'assets/svg/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }, {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
          ],
        }, {
          test: /\.(png|svg|jpe?g|gif|ttf)$/,
          loader: 'file-loader',
        }, {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              sources: {
                urlFilter: (attribute, value, resourcePath) => {
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `value` argument contains a value of the HTML attribute.
                  // The `resourcePath` argument contains a path to the loaded HTML file.
    
                  if (/index\.html$/.test(attribute)) {
                    return true;
                  }
    
                  return false;
                },
              },
            },

          },
        },
      ],
    },
    devServer: {
      static: './src/',
      port: 9000,
    },
    plugins: [
      isProduction ? new CleanWebpackPlugin({}) : nothing,
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      isAnalyze ? new BundleAnalyzerPlugin() : nothing,
    ],
    experiments: {
      topLevelAwait: true,
    },
  };
};
