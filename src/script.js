import "./style.css";
import * as THREE from "three";
import addOrbitControls from './scripts/environment/OrbitControls';
import addLights from "./scripts/environment/Lights";
import createCity from "./scripts/city/city";
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import makeGui from "./scripts/environment/GUI";
import Blimp from "./scripts/models/Blimp";
import PhysicsWorld from "./scripts/physics/PhysicsWorld";
import WeightForce from "./scripts/physics/Forces/WeightForce";


//Initiate Renderer
let width = window.innerWidth;
let height = window.innerHeight;

let sky, sun;

const can = document.querySelector("#can");

can.setAttribute("width", width);
can.setAttribute("height", height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.set(100, 100, 100);

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

/**
 * lights
 */
addLights(scene);

/**
 * Objects 
 */

var texLoad = new THREE.TextureLoader(),
        addBlend = THREE.AdditiveBlending;
// Sky Texture
var skyMat = new THREE.MeshBasicMaterial({
        map: texLoad.load("textures/cloudMap.jpg"),
        side: THREE.BackSide,
        transparent: true,
        blending: addBlend,
});
var skySphere = new THREE.SphereGeometry(5000, 30, 30), skyMat;

var skyMesh = new THREE.Mesh(skySphere, skyMat);
scene.add(skyMesh);

sky = new Sky();
sky.scale.setScalar(45000);
// sky.mesh = skyMesh;
scene.add(sky);

sun = new THREE.Vector3();

/**
 * GUI Variables
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
        uniforms['turbidity'].value = effectController.turbidity;
        uniforms['rayleigh'].value = effectController.rayleigh;
        uniforms['mieCoefficient'].value = effectController.mieCoefficient;
        uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);

        uniforms['sunPosition'].value.copy(sun);

        renderer.toneMappingExposure = effectController.exposure;
        renderer.render(scene, camera);
}

const physicalVariables = {
        gravity: 9.8,
        currentRPM: 0,
        loadMass: 5000,
        heliumVolume: 4000,
        airVelocity: 0,
        airDirection: { x: 0, y: 0, z: 0 },
        verticalRudderAlpha: 0,
        horizontalRudderAlpha: 0
};

makeGui(effectController, guiChanged, physicalVariables);
guiChanged();


// Load city by calling 'createCity' function
createCity(scene);

/**
 * Load Blimp Model
 */
const blimp = new Blimp(scene);

/**
 * Create Physic Emulator
 */
const physicsWorld = new PhysicsWorld(blimp);

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;
function animate() {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - oldElapsedTime;
        oldElapsedTime = elapsedTime;

        physicsWorld.update(deltaTime);

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
}
animate();