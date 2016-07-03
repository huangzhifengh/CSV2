import task from './lib/task';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleware from 'http-proxy-middleware'
import config from '../config'


module.exports = task('proxy', () => new Promise((resolve, reject) => {
  const webpackConfig = require('./webpack.config').default[0]; // Client-side bundle configuration
  const bundler = webpack(webpackConfig);
  const proxyConfig = config.proxy

  browserSync({
    port: config.proxy.port,
    proxy: {
      target: `localhost:${config.server.port}`,

      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,
          // Pretty colored output
          stats: webpackConfig.stats
          // For other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),
        // bundler should be the same as above
        webpackHotMiddleware(bundler),
        proxyMiddleware(config.proxy.pattern, {
          target: `${proxyConfig.protocal}://${proxyConfig.target}:${proxyConfig.targetPort}`,
          changeOrigin: true,
          logLevel: 'debug'
        })
      ],
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'build/public/**/*.css',
      'build/public/**/*.html',
    ],
  })

}))
