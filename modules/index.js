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
        size: { 
            type: 'vec2',
            default: "5, 6" 
        },
        open: { 
            default: "" 
        },
        wall: { default: "" },
        cap: { default: "" }
    },

    /** Called once when component is attached. Generally for initial setup.
     * @function
     * @memberof module:aframe-border-component
     */
    init: function () {

        console.log("INITIALIZING: ...");
   
        this.borderData = {};

        var p = document.getElementById(this.data.wall);
        if(p) {
            this.borderData.wallWidth = p.getAttribute("width");
            this.borderData.wallDepth = p.getAttribute("depth");
            this.borderData.wallHeight = p.getAttribute("height");
        } else {
            this.borderData.wallWidth = 4;
            this.borderData.wallDepth = 1;
            this.borderData.wallHeight = 1;
        }

        this.buildCapInfo();

        // this.buildOpenSpec();
    },

    buildCapInfo: function() {

        // set cap info
        var capInfo = this.data.cap.split(' '); 
        var capId = "";
        var capAdjust = 0;
        if(capInfo.length > 0) {
            capId = capInfo[0];
            capId = capId[0] == '#' ? capId.substring(1) : capId;
            if(capInfo[1]) {
                capAdjust = parseFloat(capInfo[1]);
            }
        }

        this.borderData.capId = capId;

        this.borderData.capHeight = capAdjust;
    },

    // buildOpenSpec: function() {
    //     // build open border list
    //     var openList = {
    //         "N": [],
    //         "E": [],
    //         "W": [], 
    //         "S": []
    //     };
    //     var tokens = this.data.open.split(' ');
    //     var border = null;
    //     for( var key in tokens ) {
    //         var token = tokens[key];
    //         if(["N","E","W","S"].indexOf(token) >= 0 ) {
    //             border = token;
    //         } else {
    //             if(border) {
    //                 openList[border].push(parseInt(token,10));
    //             }
    //         } 
    //     }
    //     this.borderData.openSpec = [];
    //     for( var b in openList ) {
    //         var lst = openList[b];
    //         this.borderData.openSpec.push( { border: b, list: lst } );
    //     }
    // },

    drawBorderWall: function(spec) {

      console.log("drawBorderWall: ", spec );

        spec = spec || {};
        var position = spec.position,
            rotation = spec.rotation || { x: 0, y: 0, z: 0 },
            cap = spec.cap || false,
            wallId = cap ? this.borderData.capId : this.data.wall;

        wallId = wallId[0] == '#' ? wallId.substring(1) : wallId;
 
        if(!position) {
            console.error("drawBorderWall requires position");
            return false;
        }

        var w = null;
        var p = document.getElementById(wallId);
        if(!p) {
            if(cap) {
                return true;
            }
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
        if( this.data.size ) {
            var xSize = this.data.size.x,
                radius = this.data.size.y;
            console.log("RADIUS: ", radius );
            var options = {};
            if( this.borderData.openSpec ) {
                options.open = this.borderData.openSpec;
            }
            var WALL_WIDTH = this.borderData.wallWidth,
                WALL_DEPTH = this.borderData.wallDepth,
                WALL_HEIGHT = this.borderData.wallHeight,
                CELL_SIZE = WALL_WIDTH,
                yPos = 0;

            // var xOffset = (xSize + 1) * WALL_WIDTH / 2.0;
            // var yOffset = (ySize + 1) * WALL_WIDTH / 2.0;

            var xRot = 0,
                yRot = 0,
                zRot = 0;

            var numElements = xSize,
                angle = 0,
                step = (2*Math.PI) / numElements,
                rot = 360 / numElements;
            for(var i = 0; i < numElements; i++) {
                console.log("ANGLE:", angle);
                var xPos = radius * Math.cos(angle);
                var zPos = radius * Math.sin(angle);
                angle += step;

                yRot = 90 - i * rot;

                // // draw end cap
                // if(!this.drawBorderWall({

                //     position: {
                //         x: xPos + CELL_SIZE / 2.0,
                //         // y: this.borderData.capHeight / 2.0,
                //         y: this.borderData.capHeight,
                //         z: zPos + CELL_SIZE / 2.0
                //     },
                //     cap: true
                // })) {
                //     return;
                // }

                if(!this.drawBorderWall({ 
                    position: {
                        x: xPos,
                        y: 0,
                        z: zPos
                    },
                    rotation: {
                        x: xRot,
                        y: yRot,
                        z: zRot
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
