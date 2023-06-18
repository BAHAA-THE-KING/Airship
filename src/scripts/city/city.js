import * as THREE from "three";
import { Color } from "three";
import Building from "./building";
import Road from "./Road";
import Street from "./streets";
import { loadModels } from "./models";
import { loadTrees } from "./models";
export default function createCity(scene) {
  //Load Models
  const modelPaths = [
    //Football Stadium
    "/textures/city/models/football_stadium/scene.gltf",
    //Extra building
    "/textures/city/models/european_buildings_asset_pack_3/scene.gltf",
    //Little City
    "/textures/city/models/imaginary_city_i/scene.gltf",
    //Tommy
    "/textures/city/models/tommy_gta_vice_city/scene.gltf",
  ];
  const modelPositions = [
    //Football Stadium
    new THREE.Vector3(-50, 0.1, -900),
    //Extra building
    new THREE.Vector3(990, 0.1, 10),
    //Little City
    new THREE.Vector3(10, 5, 1250 ),
    //Tommy
    new THREE.Vector3(10, 1, 10),
  ];
  const modelScales = [
    //Football Stadium
    new THREE.Vector3(8, 8, 8),
    //Extra building
    new THREE.Vector3(4, 4, 4),
    //Little City
    new THREE.Vector3(1.5, 1.5, 1.5),
    //Tommy
    new THREE.Vector3(4, 4, 4),
  ];
  const modelRotation = [
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
  ];
  loadModels(scene, modelPaths, modelPositions, modelScales, modelRotation);

  // Create a plane for the ground
  const groundGeometry = new THREE.PlaneGeometry(2800, 2800);
  // Create a material with a plain color and apply it to the ground plane
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x3b3b3b });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2; 
  scene.add(groundMesh);

  //Load buildings
const buildingTextures = [
  "/textures/city/apartments4.png",
  "/textures/city/apartments9.png",
  "/textures/city/apartments2.png",
  "/textures/city/building_office13.png",
  "/textures/city/skyscraper2.jpeg",
  "/textures/city/skyscraper1.jpg",
  "/textures/city/shop_front8.png",
  "/textures/city/apartment_block6.png",
  "/textures/city/building_house1.png",
  "/textures/city/building_jmu.png",
  "/textures/city/building_modern.png",
];
const numRows = 6;
const numCols = 16;
const buildingWidth = 60;
const buildingDepth = 38;
const buildingPromises = []; // array to store promises for each Building instance
let heightIndex = 0;
let textureIndex = 0;
// Define a function that returns a Promise that resolves when the Building is loaded
function loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture) {
  return new Promise((resolve, reject) => {
    const building = new Building(buildingWidth, buildingHeight, buildingDepth, buildingTexture);
    building.load().then(() => {
      resolve(building);
    }).catch((err) => {
      reject(err);
    });
  });
}
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const buildingHeight = Math.random()*50+70;
    const buildingTexture = buildingTextures[textureIndex];
    // Load the Building and add it to the scene
    const buildingPromise = loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture)
      .then((building) => {
        building.setPosition(
          (col - (numCols - 1) / 2) * buildingWidth * 1.6,
          building.getHeight() / 2,
          (row - (numRows - 1) / 2) * buildingDepth * 5
        );
        building.addToScene(scene);
      })
      .catch((err) => {
        console.error("Failed to create building", err);
      });
    buildingPromises.push(buildingPromise);
    textureIndex = (textureIndex + 1) % buildingTextures.length; // cycle through the texture array
  }
}
Promise.all(buildingPromises).then(() => {
  console.log("All buildings loaded");
});
      // Load road1
      const texturePath = '/textures/city/asphalt.jpg';
      const road = new Road(1500, 30, texturePath);
      scene.add(road.group);
      road.setPosition(-20, 0.5, 520);
      road.setRotation(0, 0, 0);
      // Load road2
      const texturePath2 = '/textures/city/asphalt.jpg';
      const road2 = new Road(1500, 30, texturePath2);
      scene.add(road2.group);
      road2.setPosition(-20, 0.5, 0);
      road2.setRotation(0, 0, 0);
      // Load road3
      const texturePath3 = '/textures/city/asphalt.jpg';
      const road3 = new Road(1500, 30, texturePath3);
      scene.add(road3.group);
      road3.setPosition(-20, 0.5, -375);
      road3.setRotation(0, 0, 0);
      // Load road4
      const texturePath4 = '/textures/city/asphalt.jpg';
      const road4 = new Road(1500, 30, texturePath4);
      scene.add(road4.group);
      road4.setPosition(-20, 0.5, -520);
      road4.setRotation(0, 0, 0);
      // Load road5
      const texturePath5 = '/textures/city/asphalt.jpg';
      const road5 = new Road(1500, 30, texturePath4);
      scene.add(road5.group);
      road5.setPosition(-20, 0.5, 375);
      road5.setRotation(0, 0, 0);
    }