(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

// Browser distribution of the A-Frame component.
(function () {
  if (typeof AFRAME === 'undefined') {
    console.error('Component attempted to register before AFRAME was available.');
    return;
  }

  var border = _dereq_('./modules/index');

  console.log(border.Component.name() + ": " + border.Component.version());

  // Register all components here.
  var components = {
    "border": border.Component
  };

  var primitives = {};

  Object.keys(components).forEach(function (name) {
    if (AFRAME.aframeCore) {
      AFRAME.aframeCore.registerComponent(name, components[name]);
    } else {
      AFRAME.registerComponent(name, components[name]);
    }
  });

  Object.keys(primitives).forEach(function (name) {
    if (AFRAME.aframeCore) {
      AFRAME.aframeCore.registerPrimitive(name, primitives[name]);
    } else {
      AFRAME.registerPrimitive(name, primitives[name]);
    }
  });
})();

},{"./modules/index":2}],2:[function(_dereq_,module,exports){
/**
    Module: @mitchallen/aframe-border-component
    Author: Mitch Allen
*/
/*jshint browser: true */
/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

/**
 * Module
 * @module aframe-border-component
 */

var packageName = _dereq_("../upcoming-info").name,
    packageVersion = _dereq_("../upcoming-info").upcoming.version;

/** 
* Specification for registering a border component with Aframe
* @function
* @example <caption>browserify example</caption>
* var border = require('aframe-border-component');
* if (AFRAME.aframeCore) {
*    AFRAME.aframeCore.registerComponent("border", border.Component);
* } else {
*    AFRAME.registerComponent("border", border.Component);
* }
*/
module.exports.Component = {

    version: function version() {
        return packageVersion;
    },
    name: function name() {
        return packageName;
    },

    dependencies: ['position', 'rotation'],

    /** defines the attribute properties
     * @Object
     * @memberof module:aframe-border-component
     */

    schema: {
        enabled: { default: true },
        sides: {
            type: 'int',
            default: 6
        },
        radius: {
            type: 'int',
            default: 10
        },
        open: {
            default: ""
        },
        wall: { default: "" }
    },

    /** Called once when component is attached. Generally for initial setup.
     * @function
     * @memberof module:aframe-border-component
     */
    init: function init() {

        this.borderData = {};

        var wallId = this.data.wall;

        wallId = wallId[0] == '#' ? wallId.substring(1) : wallId;

        var p = document.getElementById(wallId);
        if (p) {
            this.borderData.wallWidth = p.getAttribute("width");
            this.borderData.wallDepth = p.getAttribute("depth");
            this.borderData.wallHeight = p.getAttribute("height");
            this.borderData.wallRotation = p.getAttribute("rotation");
        } else {
            this.borderData.wallWidth = 4;
            this.borderData.wallDepth = 1;
            this.borderData.wallHeight = 1;
            this.borderData.wallRotation = { x: 0, y: 0, z: 0 };
        }

        this.borderData.openList = [];

        this.buildOpenList();
    },

    buildOpenList: function buildOpenList() {
        // build open border list

        var tokens = this.data.open.split(' ');
        for (var key in tokens) {
            var token = tokens[key];
            var i = parseInt(token, 10);
            if (!isNaN(i)) {
                if (i >= 0) {
                    this.borderData.openList[i] = true;
                }
            }
        }
    },

    drawBorderWall: function drawBorderWall(spec) {

        spec = spec || {};
        var position = spec.position || { x: 0, y: 0, z: 0 },
            rotation = spec.rotation || { x: 0, y: 0, z: 0 },
            wallId = this.data.wall;

        wallId = wallId[0] == '#' ? wallId.substring(1) : wallId;

        var w = null;
        var p = document.getElementById(wallId);
        if (!p) {
            w = document.createElement('a-box');
            this.el.appendChild(w);
            w.setAttribute('color', 'tomato');
            w.setAttribute('width', this.borderData.wallWidth);
            w.setAttribute('depth', this.borderData.wallDepth);
            w.setAttribute('height', this.borderData.wallHeight);
            w.setAttribute('static-body', '');
        } else {
            w = p.cloneNode(true);
            this.el.appendChild(w);
        }
        w.setAttribute('rotation', rotation);
        w.setAttribute('position', position);
    },

    update: function update() {
        if (!this.data.enabled) {
            return;
        }
        var sides = this.data.sides,
            radius = this.data.radius;

        var WALL_WIDTH = this.borderData.wallWidth,
            WALL_DEPTH = this.borderData.wallDepth,
            WALL_HEIGHT = this.borderData.wallHeight,
            yPos = 0;

        var wallRotation = this.borderData.wallRotation;

        var step = 2 * Math.PI / sides,
            turn = 360 / sides;
        for (var i = 0, angle = 0; i < sides; i++, angle += step) {

            var xPos = radius * Math.cos(angle);
            var zPos = radius * Math.sin(angle);

            if (!this.borderData.openList[i]) {

                this.drawBorderWall({
                    position: {
                        x: xPos,
                        y: 0,
                        z: zPos
                    },
                    rotation: {
                        x: wallRotation.x,
                        y: wallRotation.y + 90 - i * turn,
                        z: wallRotation.z
                    }
                });
            }
        }
    },

    remove: function remove() {}
};

},{"../upcoming-info":3}],3:[function(_dereq_,module,exports){
module.exports={"name":"aframe-border-component","version":"0.1.4","upcoming":{"release":"patch","version":"0.1.5"}}
},{}]},{},[1]);
