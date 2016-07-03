import path from 'path'
import webpack from 'webpack'

export default (DEBUG, VERBOSE) => {
  const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
  ]
  const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
  }
//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

  return {
    output: {
      publicPath: '/',
      sourcePrefix: '  ',
    },

    cache: DEBUG,
    debug: DEBUG,

    stats: {
      colors: true,
      reasons: DEBUG,
      hash: VERBOSE,
      version: VERBOSE,
      timings: true,
      chunks: VERBOSE,
      chunkModules: VERBOSE,
      cached: VERBOSE,
      cachedAssets: VERBOSE,
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin(GLOBALS),
      new webpack.ProvidePlugin({
        cx: 'classnames',
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        _: 'lodash',
        ajax: 'ajax'
      })
    ],

    resolve: {
      modulesDirectories: ['node_modules', 'local_modules'],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      alias: {
        'base-page': path.join(__dirname, '../../src/containers/Page/Page.js'),
        'with-style': path.join(__dirname, '../../src/decorators/WithStyles.js')
      },
      root: [path.join(__dirname, '../../src')]
    },

    module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel',
          include: [
            path.join(__dirname, '../../src'), 
            path.join(__dirname, '../../server'),
            path.join(__dirname, '../../config'),
          ]
        }, {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?name=font/[name].[ext]&limit=5000', // small than 5kb
        }, {
          test: /\.(eot|ttf|wav|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name=font/[name].[ext]',
        }
      ]
    },

    postcss: function plugins() {
      return [
        require('postcss-import')({
          onImport: files => files.forEach(this.addDependency),
          path: ['./src']
        }),
        require('postcss-nested')(),
        require('postcss-cssnext')({autoprefixer: AUTOPREFIXER_BROWSERS}),
      ];
    }
  }
}
