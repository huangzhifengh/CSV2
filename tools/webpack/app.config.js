import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import _ from 'lodash'

export default (config, WATCH, DEBUG, VERBOSE) => {
  return _.merge({}, config, {
    entry: {
      app: [
        'font-awesome-webpack',
        ...(WATCH ? ['webpack-hot-middleware/client'] : []),
        './src/index'
      ],
      lib: ['react', 'react-dom', 'redux', 'jquery', 'lodash', 'react-router', 'classnames'],
    },
    output: {
      path: path.join(__dirname, '../../build/public'),
      filename: DEBUG ? 'bundle.[name].js' : '[name].[hash].js',
      chunkFilename: 'bundle.[chunkhash].js'
    },
    // Choose a developer tool to enhance debugging
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
    plugins: [
      ...config.plugins,
      ...(!DEBUG ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: VERBOSE,
          },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlWebpackPlugin({
          template: './src/templates/index.html',
        }),
      ] : []),
      ...(WATCH ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ] : []),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'lib',
        minChunks: Infinity
      })
    ],
    module: {
      loaders: [
        ...config.module.loaders,
        {
          test: /\.css$/,
          loader: 'style-loader/useable!css-loader!postcss-loader',
        }
      ]
    }
  })
}
