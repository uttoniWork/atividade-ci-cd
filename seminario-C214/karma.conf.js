// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { report } = require('process');
const { resourceLimits } = require('worker_threads');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-sonarqube-unit-reporter',
      'karma-spec-reporter',
      '@angular-devkit/build-angular/plugins/karma'
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
        random: false
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/atividade-ci-cd'),
      reports: ['lcovonly', 'cobertura', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['kjhtml', 'junit', 'spec'],
    junitReporter: {
      outputDir: './coverage/atividade-ci-cd', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: 'atividade-ci-cd', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names,
      nameFormatter: (browser, result) => {
        return result.description;
      }, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: (browser, result) => {
        return result.suite.join('.');
      } // function (browser, result) to customize the classname attribute in xml testcase element
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'coverage/atividade-ci-cd/ut_report.xml',
      useBrowserName: false
    },
    reporters: config.angularCli && config.angularCli.codeCoverage ? ['coverage'] : ['junit', 'spec', 'kjhtml', 'sonarqubeUnit'],
    specReporter: {
      suppressSkipped: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    browserNoActivityTimeout: 40000,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    restartOnFileChange: true
  });
};
