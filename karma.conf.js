module.exports = function(config) {
  config.set({

    reporters: ['progress', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },

  });
};
