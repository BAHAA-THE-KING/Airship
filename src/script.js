import "./style.css";
import * as THREE from "three";
import Cube from "./scripts/Cube.js";
import addOrbitControls from './scripts/OrbitControls.js';
let width=window.innerWidth;
let height=window.innerHeight;

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

//Code
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

/*
let cube=new Cube(1,1,1,0xFF0000);
scene.add(cube.mesh);
*/

// Create a new cube using the Cube class
let cube = new Cube(0, 0, 0, 1, 0xff0000);

// Add the cube to the scene
cube.addToScene(scene);

// Rotate the cube
cube.rotate(0.01, 0.01, 0);

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