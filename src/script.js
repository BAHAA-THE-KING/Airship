import "./style.css";
import * as THREE from "three";
import addOrbitControls from './scripts/OrbitControls';
import Cube from "./scripts/Cube";
import Lights from "./scripts/Lights";
import Skybox from "./scripts/Skybox";
import Floor from "./scripts/Floor";
import createCity from "./scripts/city/city";
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


//Initiate Renderer
let width = window.innerWidth;
let height = window.innerHeight;

const gui = new GUI();
let sky,sun;

const can = document.querySelector("#can");

can.setAttribute("width", width);
can.setAttribute("height", height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.set(10, 10, 5);

const scene = new THREE.Scene();

const renderer = new THREE.WebGL1Renderer({ canvas: can });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.render(scene, camera);
window.onresize = function () {
        width = window.innerWidth;
        height = window.innerHeight;
        can.setAttribute("width", width);
        can.setAttribute("height", height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
};

// Add OrbitControls to the camera
const controls = addOrbitControls(camera, renderer);

// Create a new skybox using the Skybox class
// const skybox = new Skybox([
//         'textures/skybox/px.jpg',
//         'textures/skybox/nx.jpg',
//         'textures/skybox/py.jpg',
//         'textures/skybox/ny.jpg',
//         'textures/skybox/pz.jpg',
//         'textures/skybox/nz.jpg',
// ], scene);

/**
 * lights
 */
let lights = new Lights(scene);

/**
 * Objects 
 */

var texLoad = new THREE.TextureLoader(),
addBlend = THREE.AdditiveBlending;
 // Sky Texture
var skyMat = new THREE.MeshBasicMaterial( {
    map : texLoad.load( "textures/cloudMap.jpg" ),
    side: THREE.BackSide,
    transparent: true,
    blending: addBlend,
   });
 var skySphere = new THREE.SphereBufferGeometry( 5000, 10, 5 ),skyMat;

var skyMesh = new THREE.Mesh( skySphere, skyMat );
scene.add( skyMesh );

sky = new Sky();
sky.scale.setScalar( 45000 );
// sky.mesh = skyMesh;
scene.add( sky );

sun = new THREE.Vector3();




/**
 * GUI
 */



const effectController = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 2,
        azimuth: 180,
        exposure: renderer.toneMappingExposure
};

function guiChanged() {

        const uniforms = sky.material.uniforms;
        uniforms[ 'turbidity' ].value = effectController.turbidity;
        uniforms[ 'rayleigh' ].value = effectController.rayleigh;
        uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
        uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
        const theta = THREE.MathUtils.degToRad( effectController.azimuth );

        sun.setFromSphericalCoords( 1, phi, theta );

        uniforms[ 'sunPosition' ].value.copy( sun );

        renderer.toneMappingExposure = effectController.exposure;
        renderer.render( scene, camera );

}



gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

guiChanged();




// Create a new cube using the Cube class
const floor = new Floor(10000, "white");
//floor.addToScene(scene);

const cube = new Cube(1, 0xffffff);
cube.rotate(0.01, 0.01, 0);
// cube.addToScene(scene);


// Load city by calling 'createCity' function

createCity(scene);

let loader = new GLTFLoader();
loader.load("/models/good_year_blimp/good year blimp.gltf", (gltf) => {
        let blimp = gltf.scene;
        blimp.scale.set(53 / 10, 53 / 10, 53 / 10);
        blimp.position.set(600, 0, 200)
        let bx = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                        color: "#FF0000"
                })
        );
        bx.position.x = 0;
        bx.position.y = 100;
        bx.position.z = 0;
        scene.add(bx);
        scene.add(blimp);
});
//Animate
const clock = new THREE.Clock();
let oldElapsedTime = 0;
function animate() {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - oldElapsedTime;
        oldElapsedTime = elapsedTime;

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
}
animate();