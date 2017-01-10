
// Browser distribution.

(function () {

  // This code will run when script is loaded in the browser

  /**
    * To use this file, in Gruntfile.js comment out browserify / ... / standalone:

         browserify: {
               dist: {
                options: {
                    browserifyOptions: {
                        // standalone: ...

    * Also in Gruntfile.js comment out:

        // "./dist/PACKAGE_NAME.js": ["./modules/index.js"]

    * and replace it with

        "./dist/PACKAGE_NAME.js": ["./browser.js"]

    */

  var _package = require('./modules/index');

  _package.create({});


})();