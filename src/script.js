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
import { makeSpheres } from "./scripts/Environment/spheres";

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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
const { ambientLight, directionalLight } = addLights(scene);

/**
 * Objects
 */
const textureLoader = new THREE.TextureLoader();
const textures = [];
for (let i = 1; i < 6; i++) {
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
stats.dom.classList.add("output_fps");
document.body.appendChild(stats.dom);

/**
 * GUI Variables
 */

const Morning = {
  turbidity: 10,
  rayleigh: 4,
  mieCoefficient: 0.1,
  mieDirectionalG: 1.0,
  elevation: 90,
  azimuth: 180,
  exposure: renderer.toneMappingExposure,
};
const Evning = {
  turbidity: 3,
  rayleigh: 3,
  mieCoefficient: 0.096,
  mieDirectionalG: 0.607,
  elevation: 0,
  azimuth: 180,
  exposure: renderer.toneMappingExposure,
};
const Night = {
  turbidity: 20,
  rayleigh: 0.5,
  mieCoefficient: 0.1,
  mieDirectionalG: 1.0,
  elevation: 30,
  azimuth: 180,
  exposure: renderer.toneMappingExposure,
};

let selectedTime = { ...Evning };
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
  showCollision: false,
  collide: true,
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

const output = {
  WeightX: 0,
  WeightY: 0,
  WeightZ: 0,

  BuoyancyX: 0,
  BuoyancyY: 0,
  BuoyancyZ: 0,

  DragX: 0,
  DragY: 0,
  DragZ: 0,

  ThrustX: 0,
  ThrustY: 0,
  ThrustZ: 0,
  Thrust: 0,

  WindX: 0,
  WindY: 0,
  WindZ: 0,

  AccelerationX: 0,
  AccelerationY: 0,
  AccelerationZ: 0,
  Acceleration: 0,

  VelocityX: 0,
  VelocityY: 0,
  VelocityZ: 0,
  Velocity: 0,

  PositionX: 0,
  PositionY: 0,
  PositionZ: 0,
};

const timeControl = {
  Morning: () => {
    selectedTime = { ...Morning };

    ambientLight.intensity = 1;
    ambientLight.color = new THREE.Color("white");
    directionalLight.position.set(0, 1000, 0);
    directionalLight.color = new THREE.Color("white");
    directionalLight.intensity = 0.5;
    directionalLight.castShadow = false

    guiChanged();
  },
  Evning: () => {
    selectedTime = { ...Evning };

    ambientLight.intensity = 0.7;
    ambientLight.color = new THREE.Color("orange");
    directionalLight.position.set(0, 3000, -6000);
    directionalLight.color = new THREE.Color("orange");
    directionalLight.intensity = 1;
    directionalLight.castShadow = true;

    guiChanged();
  },
  Night: () => {
    selectedTime = { ...Night };

    ambientLight.intensity = 0.1;
    ambientLight.color = new THREE.Color("white");
    directionalLight.position.set(0, 6000, -6000);
    directionalLight.color = new THREE.Color("white");
    directionalLight.intensity = 0.1;
    directionalLight.castShadow = true;

    guiChanged();
  }
};

const cameraControl = {
  lookAtBlimp: () => controls.target = blimp.position.clone(),
  autoLookAtBlimp: false,
  goToBlimp: function () {
    this.lookAtBlimp();
    const blimpPos = blimp.position.clone();
    blimpPos.x += 329;
    blimpPos.y += 252;
    blimpPos.z += 328;
    camera.position.set(blimpPos.x, blimpPos.y, blimpPos.z);
  }
};
function showCollision(show) {
  if (show) {
    scene.add(...spheres);
  } else {
    scene.remove(...spheres);
  }
}
const outputFolder = makeGui(timeControl, cameraControl, physicalVariables, output, showCollision);
guiChanged();

/**
 * Load city by calling 'createCity' function
 *
 */
//createCity(scene);
makeMountain(scene);
makeText(scene);
const spheres = makeSpheres();
/**
 * Load Blimp Model
 */
const blimp = new Blimp(scene);

/**
 * Create Physic Emulator
 */
const physicsWorld = new PhysicsWorld(blimp, physicalVariables, controls, output, outputFolder);

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;
function animate() {
  stats.begin();
  const elapsedTime = clock.getElapsedTime(); // Make sure you have a clock instance

  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  physicsWorld.update(deltaTime);
  if (cameraControl.autoLookAtBlimp) controls.target = blimp.position.clone();
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
