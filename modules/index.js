/**
    Module: @mitchallen/aframe-border-component
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

/**
 * Module
 * @module aframe-border-component
 */

/**
 * 
 * Factory module
 * @module aframe-border-component-factory
 */

 /** 
 * Factory method 
 * It takes one spec parameter that must be an object with named parameters
 * @param {Object} options Named parameters object
 * @returns {module:aframe-border-component}
 * @example <caption>Usage example</caption>
 * var factory = require("@mitchallen/aframe-border-component");
 * var obj = factory.create({});
 */
module.exports.create = (spec) => {
    if(!spec) {
        return null;
    }
    // private 
    let _package = "@mitchallen/aframe-border-component";
    return {
        // public
        /** Returns the package name
          * @function
          * @instance
          * @memberof module:aframe-border-component
        */
        package: () => _package,
        /** Health check
          * @function
          * @instance
          * @memberof module:aframe-border-component
          * @example <caption>Health check</caption>
          * obj.health.should.eql("OK");
        */
        health: () => "OK"
    };
};
