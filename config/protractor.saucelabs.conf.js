'use strict';

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter'),
    pkg = require('../package.json');

exports.config = {

  // If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
  // The tests will be run remotely using SauceLabs.
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  sauceBuild: process.env.CIRCLE_BUILD_NUM,

  directConnect: false,

  // The timeout for each script run on the browser. This should be longer
  // than the maximum time your application needs to stabilize between tasks.
  allScriptsTimeout: 60000,

  // How long to wait for a page to load.
  getPageTimeout: 60000,

  // ----- What tests to run -----
  //
  // Spec patterns are relative to the location of this config.
  specs: [
    '../e2e/**/*.e2e.ts'
  ],

  // Saucelabs capabilities reference
  // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
  multiCapabilities: [
    {
      'browserName': 'firefox',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Firefox 45: Linux) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '45.0',
      'platform': 'Linux'
    },
    {
      'browserName': 'chrome',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Chrome 48: Linux) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '48.0',
      'platform': 'Linux'
    },
    {
      'browserName': 'internet explorer',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (IE11: Windows 10) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '11.0',
      'platform': 'Windows 10'
    },
    {
      'browserName': 'internet explorer',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (IE10: Windows 8) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '10.0',
      'platform': 'Windows 8'
    },
    {
      'browserName': 'safari',
      'build': process.env.CIRCLE_BUILD_NUM,
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Safari: OS X 10.11) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'version': '9.0',
      'platform': 'OS X 10.11'
    },
    {
      'browserName': 'Safari',
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'build': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Safari: i0S 9.3) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'deviceName': 'iPhone 6',
      'platformName': 'iOS',
      'platformVersion': '9.3',
      'appiumVersion': '1.5.3',
      'deviceOrientation': 'portrait'
    },
    {
      'browserName': 'Browser',
      'tunnel-identifier': process.env.CIRCLE_BUILD_NUM,
      'build': process.env.CIRCLE_BUILD_NUM,
      'name':  pkg.name + ' (Android: 5.1) Build: ' + process.env.CIRCLE_BUILD_NUM,
      'deviceName': 'Android Emulator',
      'deviceType': 'phone',
      'platformName': 'Android',
      'platformVersion': '5.1',
      'appiumVersion': '1.5.3',
      'deviceOrientation': 'portrait'
    }
  ],

  // ----- More information for your tests ----
  //
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:3000/',

  // ----- The test framework -----
  //
  // Jasmine is fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'jasmine',

  // ----- Options to be passed to minijasminenode -----
  //
  // See the full list at https://github.com/juliemr/minijasminenode
  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    onComplete: null,
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 60000,

    print: function() {}
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true,


  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },


  onPrepare: function() {
    require('ts-node').register({ project: 'e2e' });
    jasmine.getEnv().addReporter(new SpecReporter());
  }

};
