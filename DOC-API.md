<a name="module_aframe-border-component"></a>

## aframe-border-component
Module


* [aframe-border-component](#module_aframe-border-component)
    * [.schema](#module_aframe-border-component.schema)
    * [.Component()](#module_aframe-border-component.Component)
    * [.init()](#module_aframe-border-component.init)

<a name="module_aframe-border-component.schema"></a>

### aframe-border-component.schema
defines the attribute properties

**Kind**: static property of <code>[aframe-border-component](#module_aframe-border-component)</code>  
**Object**:   
<a name="module_aframe-border-component.Component"></a>

### aframe-border-component.Component()
Specification for registering a border component with Aframe

**Kind**: static method of <code>[aframe-border-component](#module_aframe-border-component)</code>  
**Example** *(browserify example)*  
```js
var border = require('aframe-border-component');
if (AFRAME.aframeCore) {
   AFRAME.aframeCore.registerComponent("border", border.Component"\);
} else {
   AFRAME.registerComponent("border", border.Component);
}
```
<a name="module_aframe-border-component.init"></a>

### aframe-border-component.init()
Called once when component is attached. Generally for initial setup.

**Kind**: static method of <code>[aframe-border-component](#module_aframe-border-component)</code>  
