var allTestFiles = []

/*
var TEST_REGEXP = /(spec|test)\.js$/i
console.log(window.__karma__.files)
// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(normalizedTestModule)
  }
})
console.log(allTestFiles);
*/

allTestFiles.push("/base/test/001_model/PPMModel_test.js");
allTestFiles.push("/base/test/001_model/PassCard_test.js");
allTestFiles.push("/base/test/002_functional/PassCard_test.js");

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
    model: 'lib/ppm_bridge/model',
    backbone: 'node_modules/backbone/backbone',
    jquery: 'node_modules/jquery/dist/jquery',
    underscore: 'node_modules/underscore/underscore',
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
})
