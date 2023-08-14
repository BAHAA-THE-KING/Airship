import "./style.css";
import * as THREE from "three";
import addOrbitControls from "./scripts/environment/OrbitControls.js";
import addLights from "./scripts/environment/Lights";
import createCity from "./scripts/city/city";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import makeGui from "./scripts/environment/GUI";
import Blimp from "./scripts/models/Blimp";
import PhysicsWorld from "./scripts/physics/PhysicsWorld";
import { createClouds } from "./scripts/Environment/clouds";
import { Water } from "three/examples/jsm/objects/Water.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import makeMountain from "./scripts/Environment/mountain.js";
import makeText from "./scripts/Environment/text.js";

//Initiate Renderer
let width = window.innerWidth;
let height = window.innerHeight;

let sun, water;
// Define global variables for time and day-night cycle
let currentTime = 0; // Initial time
const dayDuration = 600; // Duration of one day in seconds

const can = document.querySelector("#can");

can.setAttribute("width", width);
can.setAttribute("height", height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 15000);
camera.position.set(929, 252, 528);

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
// const cameraTarget = new THREE.Vector3(0, 0, 0); // Set this to the desired target point
// controls.target.copy(cameraTarget);
controls.target.set(600, 0, 200);

/**
 * lights
 */
addLights(scene);

/**
 * Objects
 */
const textureLoader = new THREE.TextureLoader();
const textures = [];
for (let i = 1; i < 7; i++) {
  textures[i] = textureLoader.load(`textures/clouds/${i}.png`);
  var clouds = createClouds(scene, textures[i], 10);
}

sun = new THREE.Vector3();

// Water

const waterGeometry = new THREE.PlaneGeometry(12000, 12000);

water = new Water(waterGeometry, {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load(
    "textures/waternormals.jpg",
    (texture) => (texture.wrapS = texture.wrapT = THREE.RepeatWrapping)
  ),
  sunDirection: new THREE.Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x001e0f,
  distortionScale: 3.7,
  fog: !!scene.fog,
});
water.rotation.x = -Math.PI / 2;
water.position.y = -10;
const minAllowedY = -33;
scene.add(water);

const audioListener = new THREE.AudioListener();
camera.add(audioListener);

const audioLoader = new THREE.AudioLoader();
let audio;

// Load audio after a user gesture (e.g., a click event)
document.addEventListener("click", function () {
  audioLoader.load("audio/seaSound.mp3", function (buffer) {
    audio = new THREE.PositionalAudio(audioListener);
    audio.setBuffer(buffer);
    audio.setLoop(true); // Set audio to loop
    audio.setRefDistance(70);
    audio.play(); // Start playing the audio
  });
});

// Skybox
const sky = new Sky();
sky.scale.setScalar(12000);
scene.add(sky);

const skyUniforms = sky.material.uniforms;

skyUniforms["turbidity"].value = 10;
skyUniforms["rayleigh"].value = 2;
skyUniforms["mieCoefficient"].value = 0.005;
skyUniforms["mieDirectionalG"].value = 0.8;

const parameters = {
  elevation: 2,
  azimuth: 180,
};

const pmremGenerator = new THREE.PMREMGenerator(renderer);
let renderTarget;

function updateSun() {
  const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
  const theta = THREE.MathUtils.degToRad(parameters.azimuth);

  sun.setFromSphericalCoords(1, phi, theta);

  sky.material.uniforms["sunPosition"].value.copy(sun);
  water.material.uniforms["sunDirection"].value.copy(sun).normalize();

  if (renderTarget !== undefined) renderTarget.dispose();

  renderTarget = pmremGenerator.fromScene(sky);

  scene.environment = renderTarget.texture;
}

updateSun();

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

/**
 * GUI Variables
 */

const afterNoon = {
  turbidity: 10,
  rayleigh: 4,
  mieCoefficient: 0.1,
  mieDirectionalG: 1.0,
  elevation: 90,
  azimuth: 180,
  afterNoon: true,
  NightTime: false,
  MorningTime: false,
  exposure: renderer.toneMappingExposure,
};
const MorningTime = {
  turbidity: 3,
  rayleigh: 3,
  mieCoefficient: 0.096,
  mieDirectionalG: 0.607,
  elevation: 0,
  azimuth: 180,
  afterNoon: false,
  NightTime: false,
  MorningTime: true,
  exposure: renderer.toneMappingExposure,
};
const NightTime = {
  turbidity: 20,
  rayleigh: 0.5,
  mieCoefficient: 0.1,
  mieDirectionalG: 1.0,
  elevation: 30,
  azimuth: 180,
  afterNoon: false,
  NightTime: true,
  MorningTime: false,
  exposure: renderer.toneMappingExposure,
};

const waterUniforms = water.material.uniforms;
let selectedTime = {
  ...afterNoon,
};
function guiChanged() {
  const uniforms = sky.material.uniforms;
  // Set properties based on the selected time of day or lighting condition
  uniforms["turbidity"].value = selectedTime.turbidity;
  uniforms["rayleigh"].value = selectedTime.rayleigh;
  uniforms["mieCoefficient"].value = selectedTime.mieCoefficient;
  uniforms["mieDirectionalG"].value = selectedTime.mieDirectionalG;

  // Calculate the sun's position based on the selected elevation and azimuth
  const phi = THREE.MathUtils.degToRad(90 - selectedTime.elevation);
  const theta = THREE.MathUtils.degToRad(selectedTime.azimuth);
  sun.setFromSphericalCoords(1, phi, theta);
  uniforms["sunPosition"].value.copy(sun);

  // Update renderer's tone mapping exposure
  renderer.toneMappingExposure = selectedTime.exposure;

  // Render the scene
  renderer.render(scene, camera);
}

const physicalVariables = {
  start: false,
  gravity: 9.8,
  currentRPM: 0,
  loadMass: 5400,
  maxVolume: 5300,
  airVolume: 0,
  windVelocity: 0,
  windDirection: { x: 0, y: 0, z: 0 },
  verticalRudder: 0,
  horizontalRudder: 0,
};

function timeChange(){
        if (selectedTime.MorningTime){
                selectedTime.NightTime=MorningTime.NightTime;
                selectedTime.afterNoon=MorningTime.afterNoon;
                selectedTime.azimuth=MorningTime.azimuth;
                selectedTime.MorningTime=MorningTime.MorningTime;
                selectedTime.elevation=MorningTime.elevation;
                selectedTime.exposure=MorningTime.exposure;
                selectedTime.mieCoefficient=MorningTime.mieCoefficient;
                selectedTime.mieDirectionalG=MorningTime.mieDirectionalG;
                selectedTime.rayleigh=MorningTime.rayleigh;
                selectedTime.turbidity=MorningTime.turbidity;
        }
        if (selectedTime.NightTime){
                selectedTime.NightTime=NightTime.NightTime;
                selectedTime.afterNoon=NightTime.afterNoon;
                selectedTime.azimuth=NightTime.azimuth;
                selectedTime.MorningTime=NightTime.MorningTime;
                selectedTime.elevation=NightTime.elevation;
                selectedTime.exposure=NightTime.exposure;
                selectedTime.mieCoefficient=NightTime.mieCoefficient;
                selectedTime.mieDirectionalG=NightTime.mieDirectionalG;
                selectedTime.rayleigh=NightTime.rayleigh;
                selectedTime.turbidity=NightTime.turbidity;
        }
        if (selectedTime.afterNoon){
                selectedTime.NightTime=afterNoon.NightTime;
                selectedTime.afterNoon=afterNoon.afterNoon;
                selectedTime.MorningTime=afterNoon.MorningTime;
                selectedTime.azimuth=afterNoon.azimuth;
                selectedTime.elevation=afterNoon.elevation;
                selectedTime.exposure=afterNoon.exposure;
                selectedTime.mieCoefficient=afterNoon.mieCoefficient;
                selectedTime.mieDirectionalG=afterNoon.mieDirectionalG;
                selectedTime.rayleigh=afterNoon.rayleigh;
                selectedTime.turbidity=afterNoon.turbidity;
        }
        guiChanged();
}

makeGui(waterUniforms, selectedTime, guiChanged, physicalVariables,timeChange);
guiChanged();

/**
 * Load city by calling 'createCity' function
 *
 */
createCity(scene);

makeMountain(scene);
makeText(scene);
/**
 * Load Blimp Model
 */
const blimp = new Blimp(scene);

/**
 * Create Physic Emulator
 */
const physicsWorld = new PhysicsWorld(blimp, physicalVariables, controls);

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;
let daytime = 0;
function animate() {
  stats.begin();
  const elapsedTime = clock.getElapsedTime(); // Make sure you have a clock instance

  // daytime += 0.01;
  // console.log("1",selectedTime.elevation)
  // console.log("2",(MorningTime.elevation - afterNoon.elevation) / 100)
  // if (0 <= daytime && daytime < 1) {
  //         selectedTime.turbidity += (MorningTime.turbidity - afterNoon.turbidity) / 100;
  //         selectedTime.rayleigh += (MorningTime.rayleigh - afterNoon.rayleigh) / 100;
  //         selectedTime.mieCoefficient += (MorningTime.mieCoefficient - afterNoon.mieCoefficient) / 100;
  //         selectedTime.mieDirectionalG += (MorningTime.mieDirectionalG - afterNoon.mieDirectionalG) / 100;
  //         selectedTime.elevation += (MorningTime.elevation - afterNoon.elevation) / 100;
  //         guiChanged();
  //         updateSun();
  // }else if (1 <= daytime && daytime < 2) {
  //         selectedTime.turbidity += (NightTime.turbidity - MorningTime.turbidity) / 100;
  //         selectedTime.rayleigh += (NightTime.rayleigh - MorningTime.rayleigh) / 100;
  //         selectedTime.mieCoefficient += (NightTime.mieCoefficient - MorningTime.mieCoefficient) / 100;
  //         selectedTime.mieDirectionalG += (NightTime.mieDirectionalG - MorningTime.mieDirectionalG) / 100;
  //         selectedTime.elevation += (NightTime.elevation - MorningTime.elevation) / 100;
  //         guiChanged();
  //         updateSun();
  // }else if (2 <= daytime && daytime < 3) {
  //         selectedTime.turbidity += (afterNoon.turbidity - NightTime.turbidity) / 100;
  //         selectedTime.rayleigh += (afterNoon.rayleigh - NightTime.rayleigh) / 100;
  //         selectedTime.mieCoefficient += (afterNoon.mieCoefficient - NightTime.mieCoefficient) / 100;
  //         selectedTime.mieDirectionalG += (afterNoon.mieDirectionalG - NightTime.mieDirectionalG) / 100;
  //         selectedTime.elevation += (afterNoon.elevation - NightTime.elevation) / 100;
  //         guiChanged();
  //             updateSun();
  // }
  // if (daytime>=3)daytime=0;
  // console.log(daytime);
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  if (blimp.isReady) {
    if (blimp.position.y < -10) {
      blimp.position.y = blimp.position.y - 0.1;

      physicalVariables.start = false;
    }
    if (blimp.position.y < minAllowedY) {
      blimp.position.setY(minAllowedY);
    }
  }

  physicsWorld.update(deltaTime);
  controls.update();

  render();
  stats.update();
  clouds.rotation.y += 0.001;

  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(animate);
}
function render() {
  const time = performance.now() * 0.001;
  water.material.uniforms["time"].value += 1.0 / 60.0;
  renderer.render(scene, camera);
}
animate();
