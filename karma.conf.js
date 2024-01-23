module.exports = function (config) {
  config.set({
    reporters: ['progress', 'karma-coverage-istanbul-reporter'],

    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage-istanbul-reporter',
    ],
    
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      dir: 'coverage',
      fixWebpackSourcePaths: true,
    },

    preprocessors: {
      '**/*.ts': ['webpack', 'sourcemap'],
    },
  });
};
