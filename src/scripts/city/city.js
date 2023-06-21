import * as THREE from "three";
import { Color } from "three";
import Building from "./building";
import Road from "./Road";
import Street from "./streets";
import { loadModels } from "./models";
import { repeatModel } from "./models";
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
    new THREE.Vector3(-700, 0.1, -1050),
    //Extra building
    new THREE.Vector3(1400, 0.1, 10),
    //Little City
    new THREE.Vector3(300, -5, 400 ),
    //Tommy
    new THREE.Vector3(10, 12, 10),

  ];
  const modelScales = [
    //Football Stadium
    new THREE.Vector3(8, 8, 8),
    //Extra building
    new THREE.Vector3(8, 8, 8),
    //Little City
    new THREE.Vector3(2.5, 2.5, 2.5),
    //Tommy
    new THREE.Vector3(4, 4, 4),

  ];
  const modelRotation = [
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI * 1.5),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI - 0.006, Math.PI /2),
    new THREE.Vector3(Math.PI / 2, Math.PI , Math.PI / 2),

  ];
  loadModels(scene, modelPaths, modelPositions, modelScales, modelRotation);

  // Create a plane for the ground
  const groundGeometry = new THREE.PlaneGeometry(5000, 5000);
  // Create a material with a plain color and apply it to the ground plane
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x3b3b3b });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2; 
  scene.add(groundMesh);

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
  const numRows1 = 2; // number of rows for the first set of buildings
  const numCols1 = 18; // number of columns for the first set of buildings
  const numRows2 = 2; // number of rows for the second set of buildings
  const numCols2 = 25; // number of columns for the second set of buildings
  const numRows3 = 13; // number of rows for the third set of buildings
  const numCols3 = 15; // number of columns for the third set of buildings
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
  // Add the first set of buildings
  for (let row = 0; row < numRows1; row++) {
    for (let col = 0; col < numCols1; col++) {
      const buildingHeight = Math.random()*50+70;
      const buildingTexture = buildingTextures[textureIndex];
      // Load the Building and add it to the scene
      const buildingPromise = loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture)
        .then((building) => {
          building.setPosition(
            (col - (numCols1 - 1) / 2) * buildingWidth * 1.6,
            building.getHeight() / 2,
            (row - (numRows1 - 1) / 2) * buildingDepth * 70
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
  // Add the second set of buildings
  for (let row = 0; row < numRows2; row++) {
    for (let col = 0; col < numCols2; col++) {
      const buildingHeight = Math.random()*50+90;
      const buildingTexture = buildingTextures[textureIndex];
      // Load the Building and add it to the scene
      const buildingPromise = loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture)
        .then((building) => {
          building.setPosition(
            (col - (numCols2 - 1) / 2) * buildingWidth * 1.2,
            building.getHeight() / 2,
            (row - (numRows2 - 1) / 2) * buildingDepth * 39  // adjust the z position to account for the first set of buildings
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
  // Add the third set of buildings
  for (let row = 0; row < numRows3; row++) {
    for (let col = 0; col < numCols3; col++) {
      const buildingHeight = Math.random()*50+85;
      const buildingTexture = buildingTextures[textureIndex];
      // Load the Building and add it to the scene
      const buildingPromise = loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture)
        .then((building)=> {
          building.setPosition(
            (col - (numCols3 - 1) / 2) * buildingDepth * 1.45 - 1400, // adjust the x position to account for the second set of buildings
            building.getHeight() / 2,
            (row - (numRows3 - 1) / 2) * buildingWidth * 4 // adjust the z position to account for the rotation
          );
          building.setRotation(0, Math.PI / 2, 0); // rotate the building 90 degrees
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
      const road = new Road(1300, 75, texturePath);
      scene.add(road.group);
      road.setPosition(250, 0.5, -938);
      road.setRotation(0, 0, 0);
            
      const texturePath2 = '/textures/city/asphalt.jpg';
      const road2 = new Road(1300, 75, texturePath2);
      scene.add(road2.group);
      road2.setPosition(250, 0.5, -1138);
      road2.setRotation(0, 0, 0);
      
      // // Load road2
      // const texturePath3 = '/textures/city/asphalt.jpg';
      // const road3 = new Road(1200, 75, texturePath3);
      // scene.add(road3.group);
      // road3.setPosition(200, 0.5, -125);
      // road3.setRotation(0, 0, 0);

      // // Load road4
      // const texturePath4 = '/textures/city/asphalt.jpg';
      // const road4 = new Road(1200, 75, texturePath4);
      // scene.add(road4.group);
      // road4.setPosition(200, 0.5, -400);
      // road4.setRotation(0, 0, 0);
      // // Load road5
      // const texturePath5 = '/textures/city/asphalt.jpg';
      // const road5 = new Road(1200, 75, texturePath5);
      // scene.add(road5.group);
      // road5.setPosition(200, 0.5, 120);
      // road5.setRotation(0, 0, 0);

// Load the GLTF model and repeat it 5 times
    
//     repeatModel("textures/city/models/maple_tree/scene.gltf", 5).then((repeatedModels) => {
//   // Add the group of repeated models to the scene
//   scene.add(repeatedModels);
// });
    }