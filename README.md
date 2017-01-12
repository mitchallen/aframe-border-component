@mitchallen/aframe-border-component
==
A component for creating borders in VR
--

## Browser Usage 

### Live Example 

Here are some live examples of the component. The simpler demo is ideal for mobile. 

* https://mitchallen.github.io/border/index.html - best viewed in Chrome 
* https://mitchallen.github.io/border/simple.html - simpler demo for mobile

Demo notes:

* Works fine in Chrome on a Mac
* Having issues with player falling through floor on iOS for complex demos (keep it simple on mobile)
* On Windows 10 machine (Lenovo Yoga 710 laptop) can't seem to walk and turn at the same time

* * *

### HTML Example

Run this example in a browser (you'll need to add your own image files or get them from my repo). Step off the birds-eye view platform and wander around.

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>simple aframe-border-component example</title>
        <meta name="description" content="aframe-border-component example">
        <script src="https://aframe.io/releases/0.4.0/aframe.min.js"></script>
        <script src="//cdn.rawgit.com/donmccurdy/aframe-extras/v3.2.0/dist/aframe-extras.min.js"></script>
        <script src="https://rawgit.com/ngokevin/aframe-look-at-component/master/dist/aframe-look-at-component.min.js"></script> 
        <script src="https://rawgit.com/chenzlabs/stats-in-vr/master/dist/aframe-stats-in-vr-component.min.js"></script> 
        <script src="../../dist/aframe-border-component.min.js"></script>   
    </head>
    <body>
    <a-scene stats-in-vr physics="debug: true;">
     <a-assets>
        <img id="texture-wall" src="img/arrow-left.png">
        <img id="texture-wall-blue" src="img/arrow-left-blue.png">
        <img id="texture-wall-red" src="img/arrow-left-red.png">
        <a-box id="rail" 
          static-body color="red" 
          depth="1" width="100" height="1"></a-box>
        <a-box id="wall-one" 
          static-body material="src: #texture-wall" 
          depth="1" width="4" height="1"></a-box>
        <a-box id="wall-one-spoke" 
          static-body material="src: #texture-wall" 
          rotation="0 90 0"
          depth="1" width="4" height="1"></a-box>
        <a-box id="wall-one-long" 
          static-body material="src: #texture-wall" 
          depth="1" width="20" height="1"></a-box>
        <a-box id="wall-one-blue" 
          static-body material="src: #texture-wall-blue" 
          depth="1" width="6" height="1"></a-box>
        <a-box id="wall-one-red" 
          static-body material="src: #texture-wall-red" 
          depth="1" width="7" height="1"></a-box>
      </a-assets>
      <a-sky id="sky" color="#0000ff"></a-sky>
      <a-box id="center" 
          position="0 0 0"
          color="red" 
          depth="0.5" width="0.5" height="10"></a-box>
      <a-entity id="player"
          camera
          universal-controls
          kinematic-body
          position="0 10.8 20">
      </a-entity>
      <!-- birds-eye view box to stand on -->
      <a-box static-body 
          depth="0.25" height="0.5" width="0.5" 
          position="0 9.8 20"
          color="tomato"></a-box>

      <!-- outside border -->
      <a-entity id="arena" 
          border='sides: 4; radius: 25; wall: #rail;' 
          position='0 0.5 0'
          rotation='0 0 0'></a-entity>

      <!-- green interior -->
      <a-entity id="border1A" 
          border='sides: 3; radius: 6; wall: #wall-one;' 
          position='0 0.5 0'
          rotation='0 0 0'></a-entity>
      <a-entity id="border1B" 
          border='sides: 3; radius: 1; wall: #wall-one-spoke;' 
          position='0 0.5 0'
          rotation='0 0 0'></a-entity>

      <!-- blue ring -->
      <a-entity id="border2C" 
          border='sides: 10; radius: 15; wall: #wall-one-blue; open: 0 5;' 
          position='0 0.5 0'
          rotation='0 0 0'></a-entity>


      <a-grid id="ground" width="50" height="50" static-body color="#444444"></a-grid>

    </a-scene>
  </body>
</html>


### Include Script

Include the latest script. Update the @version in the URL as needed:

    <script src="https://unpkg.com/aframe-border-component@0.1.0/dist/aframe-border-component.min.js"></script>
    
### Define Assets

Create an __a-assets__ section and add the following:

* an __img__ to act as a material for the border
* an entity, like __a-box__, __a-cylinder__ or __a-sphere__, to act as a border

Be sure to give each entity unique __id__ attributes. They will be needed to define the border.

The example below uses the __static-body__ component from __[aframe-extras](https://github.com/donmccurdy/aframe-extras)__ so the player can not go through the borders.

    <a-assets>
      <img id="texture-wall" src="img/arrow-left.png">
      <a-box id="wall-one" 
        static-body material="src: #texture-wall" 
        depth="1" width="4" height="1"></a-box>
    </a-assets>
    
You can also set the __rotation__ for an asset. It will rotate relative to it's position and rotation along the border.

### Create an Entity with a Border Component

A __border__ component can consist of the following:

* __sides__ - the number of sides to create for the border (__sides: 6;__)
* __radius__ - the distance from the parent entity to create each border wall (__radius: 10;__)
* __wall__ - the __id__ of the entity asset that will be used to create walls of the border (__wall: #wall-one;__)
* __open__ - a zero-based list of border walls that can be opened (not drawn) to allow entering and exiting (__open: 0 2;__)

Example border with no open walls:

    <a-entity id="b4" 
      border='sides: 4; radius: 5; wall: #wall-one;' 
      position='0 0.5 0'></a-entity>

A border with open walls:

    <a-entity id="b1" 
      border='sides: 5; radius: 6; wall: #wall-one; open: 0 2;' 
      position='0 0.5 0'></a-entity>
        
### Adding / Removing Through JavaScript

An example of how to remove and add border attributes though JavaScript. The target element should be an __a-entity__.

    <script>
        // how to remove / add a border attribute through JavaScript
        document.getElementById("b1").removeAttribute("border");
        document.getElementById("b1").setAttribute(
          "border","sides: 4; radius: 5; wall: #wall-one-blue; open: 0 2;");
    </script>
     
* * *

## NPM Installation

You must use __npm__ __2.7.0__ or higher because of the scoped package name.

    $ npm init
    $ npm install @mitchallen/aframe-border-component --save
  
* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/aframe-border-component.git](https://bitbucket.org/mitchallen/aframe-border-component.git)
* [github.com/mitchallen/aframe-border-component.git](https://github.com/mitchallen/aframe-border-component.git)
* [gitlab.com/mitchallen/aframe-border-component](https://gitlab.com/mitchallen/aframe-border-component) (append __.git__ to clone)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.0 

* initial release

* * *
