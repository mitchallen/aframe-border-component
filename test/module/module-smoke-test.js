/**
    Module: @mitchallen/aframe-border-component
      Test: smoke-test-module
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    documentFactory = require("mockbot-document"),
    modulePath = "../../modules/index";

describe('module smoke test', () => {

    var module = null;

    var component = {};

    before( done => {
        // Call before all tests

        // mock browser document

        global.document = documentFactory.create();

        document.mockElement( { tagName: "a-box", id: "wall-one" } );

        done();
    });

    after( done => {
        // Call after all tests

        delete global.document;

        done();
    });

    beforeEach( done => {
        // Call before each test
        delete require.cache[require.resolve(modulePath)];
        module = require(modulePath);

        component = module.Component;
        component.el = {
            appendChild: function(el) {},
        }
        component.data = {};
        // copy defaults from schema
        for(var k in component.schema) {
            var cType = component.schema[k].type;
            switch(cType) {
                default:
                    component.data[k] = component.schema[k].default;
                    break;
            }
        } 
        done();
    });

    afterEach( done => {
        // Call after eeach test
        done();
    });

    it('module should exist', done => {
        should.exist(module);
        done();
    })


    it('Component should return component object', done => {
        should.exist(module);
        var component = module.Component;
        should.exist(component);
        done();
    })

    it('component.version should match upcoming version', done => {
        var component = module.Component;
        should.exist(component.version);
        console.log(component.version());
        component.version().should.eql(require("../../upcoming-info").upcoming.version);
        done();
    })

    it('component.name should match package name', done => {
        var component = module.Component;
        should.exist(component.name);
        console.log(component.name());
        component.name().should.eql(require("../../upcoming-info").name);
        done();
    })

    it('component init should succeed', done => {      
        component.init();
        done();
    })

    it('component init should succeed for found wall element', done => { 
        var wallId = "wall-one";
        var el = document.getElementById(wallId);
        should.exist(el);
        var w = el.getAttribute("width");
        component.data.wall = wallId;    
        component.init();
        done();
    })

    it('component init should succeed for found wall element with pound sign starting name', done => { 
        component.data.wall = "#wall-one";    
        component.init();
        done();
    })


    it('component init should succeed for open data', done => { 
        component.data.open = "N 0";    
        component.init();
        done();
    })

    it('component init should succeed for open data has negative value', done => { 
        component.data.open = "N -1";    
        component.init();
        done();
    })

    it('component update should succeed', done => {   
        component.init();  
        component.update();
        done();
    })

    it('component update should succeed if enabled = false', done => { 
        component.init();
        component.data.enabled = false;     
        component.update();
        done();
    })

    it('component update with valid wall id should succeed', done => {
        component.init(); 
        component.data.wall = "#wall-one";    
        component.update();
        done();
    })

    it('component update should succeed for found wall element', done => { 
        component.data.wall = "wall-one";    
        component.init();
        component.update();
        done();
    })

    it('component update should succeed for found wall element with pound sign starting name', done => { 
        component.data.wall = "#wall-one";    
        component.init();
        component.update();
        done();
    })

    it('component update should succeed for open data', done => { 
        component.data.open = "N 0";    
        component.init();
        component.update();
        done();
    })

    it('drawBorderWall with no spec should succeed', done => { 
        component.init();    
        component.drawBorderWall();
        done();
    })

    it('remove should succeed', done => {     
        component.remove();
        done();
    })

    it('remove after init should succeed', done => {  
        component.init();   
        component.remove();
        done();
    })

    it('remove after update should succeed', done => {  
        component.init(); 
        component.update();  
        component.remove();
        done();
    })
});
