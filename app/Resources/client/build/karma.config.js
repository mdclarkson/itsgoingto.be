const argv = require('yargs').argv
const webpackConfig = require('./webpack.config')

let moduleConfig = webpackConfig.module
moduleConfig.rules.push({
  enforce: 'post',
  test: /\.js$/,
  loader: 'istanbul-instrumenter-loader',
  query: {
    esModules: true
  },
  exclude: /(tests|node_modules|\.spec\.js$)/,
})

let reports = [ 'text-summary' ]
if (!argv.watch) {
  reports = [ 'html', 'lcovonly', 'text-summary' ]
}

const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
  basePath: '../',
  browsers: ['PhantomJS'],
  singleRun: !argv.watch,
  coverageIstanbulReporter: {
    reports: reports,
    dir: 'build/coverage',
    fixWebpackSourcePaths: true,
    skipFilesWithNoCoverage: false
  },
  files: [{
    pattern  : TEST_BUNDLER,
    watched  : false,
    served   : true,
    included : true
  }],
  frameworks: ['mocha'],
  reporters: ['mocha', 'coverage-istanbul'],
  preprocessors: {
    [TEST_BUNDLER] : ['webpack'],
  },
  logLevel: 'WARN',
  browserConsoleLogOptions: {
    terminal: true,
    format: '%b %T: %m',
    level: '',
  },
  webpack: {
    entry: './app/Resources/client/tests/test-bundler.js',
    devtool: 'cheap-module-source-map',
    module: moduleConfig,
    plugins: webpackConfig.plugins,
    resolve: webpackConfig.resolve,
    externals: {
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react',
    },
  },
  webpackMiddleware: {
    stats: 'errors-only',
    noInfo: true,
  },
}

module.exports = (cfg) => cfg.set(karmaConfig)
