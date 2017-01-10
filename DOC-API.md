## Modules

<dl>
<dt><a href="#module_aframe-border-component">aframe-border-component</a></dt>
<dd><p>Module</p>
</dd>
<dt><a href="#module_aframe-border-component-factory">aframe-border-component-factory</a></dt>
<dd><p>Factory module</p>
</dd>
</dl>

<a name="module_aframe-border-component"></a>

## aframe-border-component
Module


* [aframe-border-component](#module_aframe-border-component)
    * [.package()](#module_aframe-border-component+package)
    * [.health()](#module_aframe-border-component+health)

<a name="module_aframe-border-component+package"></a>

### aframe-border-component.package()
Returns the package name

**Kind**: instance method of <code>[aframe-border-component](#module_aframe-border-component)</code>  
<a name="module_aframe-border-component+health"></a>

### aframe-border-component.health()
Health check

**Kind**: instance method of <code>[aframe-border-component](#module_aframe-border-component)</code>  
**Example** *(Health check)*  
```js
obj.health.should.eql("OK");
```
<a name="module_aframe-border-component-factory"></a>

## aframe-border-component-factory
Factory module

<a name="module_aframe-border-component-factory.create"></a>

### aframe-border-component-factory.create(options) ⇒ <code>[aframe-border-component](#module_aframe-border-component)</code>
Factory method 
It takes one spec parameter that must be an object with named parameters

**Kind**: static method of <code>[aframe-border-component-factory](#module_aframe-border-component-factory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Named parameters object |

**Example** *(Usage example)*  
```js
var factory = require("@mitchallen/aframe-border-component");
var obj = factory.create({});
```
