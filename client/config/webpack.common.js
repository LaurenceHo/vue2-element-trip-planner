const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: [ './src/main.ts', 'whatwg-fetch' ],
  output: {
    path: path.resolve(__dirname, '../../dist/client'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, '../dist/client'),
      'node_modules'
    ],
    extensions: [ '.ts', '.vue', '.js', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules|vue\/src/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [ 'file-loader' ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [ 'url-loader?limit=10000&mimetype=application/font-woff' ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    /*
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    /*
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       * Copies project static assets.
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ])
  ]
};

