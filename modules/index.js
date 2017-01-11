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


 /** 
 * Specification for registering a border component with Aframe
 * @function
 * @example <caption>browserify example</caption>
 * var border = require('aframe-border-component');
 * if (AFRAME.aframeCore) {
 *    AFRAME.aframeCore.registerComponent("border, border.Component);
 * } else {
 *    AFRAME.registerComponent("border, border.Component);
 * }
 */
module.exports.Component = {

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
    init: function () {
  
        this.borderData = {};

        var wallId = this.data.wall;
            
        wallId = wallId[0] == '#' ? wallId.substring(1) : wallId;

        var p = document.getElementById(wallId);
        if(p) {
            console.log("FOUND ELEMENT");
            this.borderData.wallWidth = p.getAttribute("width");
            this.borderData.wallDepth = p.getAttribute("depth");
            this.borderData.wallHeight = p.getAttribute("height");
            this.borderData.wallRotation = p.getAttribute("rotation");
        } else {
            console.log("NO ELEMENT FOUND!");
            this.borderData.wallWidth = 4;
            this.borderData.wallDepth = 1;
            this.borderData.wallHeight = 1;
            this.borderData.wallRotation = { x: 0, y: 0, z: 0 };
        }

        this.borderData.openList = [];

        this.buildOpenList();
    },

    buildOpenList: function() {
        // build open border list
        
        var tokens = this.data.open.split(' ');
        for( var key in tokens ) {
            var token = tokens[key];
            var i = parseInt(token,10);
            if(!isNaN(i)) {
                if(i >= 0) {
                    this.borderData.openList[i] = true;
                }
            }
        }
    },

    drawBorderWall: function(spec) {

        spec = spec || {};
        var position = spec.position,
            rotation = spec.rotation || { x: 0, y: 0, z: 0 },
            wallId = this.data.wall;

        wallId = wallId[0] == '#' ? wallId.substring(1) : wallId;
 
        if(!position) {
            console.error("drawBorderWall requires position");
            return false;
        }

        var w = null;
        var p = document.getElementById(wallId);
        if(!p) {
            w = document.createElement('a-box'); 
            this.el.appendChild(w);
            w.setAttribute('color', 'tomato' );
            w.setAttribute('width',  this.borderData.wallWidth );
            w.setAttribute('depth',  this.borderData.wallDepth );
            w.setAttribute('height', this.borderData.wallHeight );
            w.setAttribute('static-body', '');
        } else {
            w = p.cloneNode(true);
            this.el.appendChild(w);
        }
        w.setAttribute('rotation', rotation);
        w.setAttribute('position', position);

        return true;
    },

    update: function () {
        if (!this.data.enabled) { return; }
        var sides = this.data.sides,
            radius = this.data.radius;

        var options = {};
        if( this.borderData.openSpec ) {
            options.open = this.borderData.openSpec;
        }
        var WALL_WIDTH = this.borderData.wallWidth,
            WALL_DEPTH = this.borderData.wallDepth,
            WALL_HEIGHT = this.borderData.wallHeight,
            CELL_SIZE = WALL_WIDTH,
            yPos = 0;

        console.log("WALL ROTATION:", this.borderData.wallRotation );

        var wallRotation = this.borderData.wallRotation;

        var sises,
            step = (2*Math.PI) / sides,
            turn = 360 / sides;
        for(var i = 0, angle = 0; i < sides; i++, angle += step) {

            var xPos = radius * Math.cos(angle);
            var zPos = radius * Math.sin(angle);

            if( !this.borderData.openList[i] ) {

                if(!this.drawBorderWall({ 
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
                })) {
                    return; 
            }
            
            }


        }
    },

    remove: function () { 
    }
};
