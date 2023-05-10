import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import Cube from "./scripts/Cube.js";
import Lights from "./scripts/lights";
import addOrbitControls from './scripts/OrbitControls.js';
import Skybox from "./scripts/Skybox";
// import modelUrl from '/models/Fox/glTF/Fox.gltf';
let width=window.innerWidth;
let height=window.innerHeight;
let model;
const can=document.querySelector("#can");

can.setAttribute("width",width);
can.setAttribute("height",height);

const camera=new THREE.PerspectiveCamera(45,width/height,0.1,1000);
camera.position.set(0, 0, 5);

const scene=new THREE.Scene();

const renderer=new THREE.WebGL1Renderer({canvas:can});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
renderer.render(scene,camera);

// Add OrbitControls to the camera
const controls = addOrbitControls(camera, renderer);

// Create a new skybox using the Skybox class
const skybox = new Skybox([
        'textures/skybox/front.jpg',
        'textures/skybox/back.jpg',
        'textures/skybox/top.jpg',
        'textures/skybox/bottom.jpg',
        'textures/skybox/right.jpg',
        'textures/skybox/left.jpg',
      ],scene);
      

      


window.onresize=function(){
                           width=window.innerWidth;
                           height=window.innerHeight;
                           can.setAttribute("width",width);
                           can.setAttribute("height",height);

                           camera.aspect=width/height;
                           camera.updateProjectionMatrix();

                           renderer.setSize(width,height);
                           renderer.setPixelRatio(window.devicePixelRatio);
                           };

/**
 * lights
 */
let lights = new Lights(scene); 



/**
 * Objects 
 */


// Create a new cube using the Cube class
let cube = new Cube(0, 0, 0, 1, 0xffffff);
let material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5,20,20),
material
);
sphere.position.set(2,0,0);

const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3,0.2,16,32),
material
);
torus.position.set(-2,0,0);

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(20,20),
material
);
plane.rotation.x = Math.PI / 2 + Math.PI   ;
plane.position.set(0,-1,0);   
plane.material.side = THREE.DoubleSide;  
scene.add(plane,sphere,torus);       
plane.material.roughness = 0.4 ;



// Add the cube to the scen e
cube.addToScene(scene);

// Rotate the cube
cube.rotate(0.01, 0.01, 0);

// Create a new loader
// const loader = new GLTFLoader();

// Load the model


// loader.load("/models/Fox/glTF/Fox.gltf", function ( gltf ) {

// 	 scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

//   function (gltf) {
//     // Create a new mesh from the loaded model
//     const mesh = gltf.scene.children[0];
//     mesh.position.set(0, 0, -5);
//     scene.add(mesh);
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );


//Animate
const clock = new THREE.Clock();
let oldElapsedTime = 0;
function animate(){
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - oldElapsedTime;
        oldElapsedTime = elapsedTime;

        renderer.render(scene,camera);
        controls.update();
        requestAnimationFrame(animate);
        }
animate();