import * as THREE from "three";
import Building from "./building";
import Road from "./Road";
import makeGround from "../environment/Ground";
import ModelManager from "../utils/ModelManager";

export default function createCity(scene) {


  // Create a box geometry
  const geometry = new THREE.BoxGeometry(800, 500, 100);

  // Create a texture loader
  const textureLoader = new THREE.TextureLoader();

  // Load the texture image
  const texture = textureLoader.load('/textures/city/ground.jpg');

  // Create a material with the texture
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // Create a mesh
  const rectangle = new THREE.Mesh(geometry, material);
  rectangle.position.x = 10;
  rectangle.position.y = 1;
  rectangle.position.z = 1000;
  rectangle.rotation.x = Math.PI / 2;

  rectangle.receiveShadow = true;
  rectangle.castShadow = true;

  // Add the rectangle to the scene
  // scene.add(rectangle);



  makeGround(scene);

  //Load Models
  const modelPaths = [
    //Airport
    "/models/airport_on_island/scene.gltf",
    //Football Stadium
    "/textures/city/models/football_stadium/scene.gltf",
    //Extra building
    // "/textures/city/models/european_buildings_asset_pack_3/scene.gltf",
    //Little City
    "/textures/city/models/imaginary_city_i/scene.gltf",
    //Tommy
    // "/textures/city/models/tommy_gta_vice_city/scene.gltf",
  ];

  const modelPositions = [
    //Airport
    new THREE.Vector3(300, -268, -100),
    //Football Stadium
    new THREE.Vector3(-290, 0.1, 250),
    //Extra building
    // new THREE.Vector3(1400, 0.1, 10),
    //Little City
    new THREE.Vector3(-800, -5, 600),
    //Tommy
    new THREE.Vector3(10, 12, 10),

  ];

  const modelScales = [
    //Airport
    new THREE.Vector3(100, 100, 100),
    //Football Stadium
    new THREE.Vector3(12, 12, 12),
    //Extra building
    // new THREE.Vector3(8, 8, 8),
    //Little City
    new THREE.Vector3(3.5, 3.5, 3.5),
    //Tommy
    // new THREE.Vector3(4, 4, 4),

  ];

  const modelRotation = [
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI * 1.5),
    // new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI - 0.006, Math.PI / 2),
    // new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),

  ];

  for (let i = 0; i < modelPaths.length; i++) {
    const path = modelPaths[i];
    const position = modelPositions[i];
    const scale = modelScales[i];
    const rotation = modelRotation[i];
    ModelManager.loadModel(path)
      .then((model) => {
        const mesh = model.scene.children[0];
        mesh.position.copy(position);
        mesh.rotation.set(rotation.x, rotation.y, rotation.z);
        mesh.scale.set(scale.x, scale.y, scale.z);
        scene.add(mesh);
      });
  }

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

  const topTexturePath = '/textures/city/roof_texture.jpeg'; // specify the path of the top texture

  const numRows1 = 2; // number of rows for the first set of buildings
  const numCols1 = 15; // number of columns for the first set of buildings
  const numRows2 = 2; // number of rows for the second set of buildings
  const numCols2 = 10; // number of columns for the second set of buildings
  const numRows3 = 2; // number of rows for the third set of buildings
  const numCols3 = 3; // number of columns for the third set of buildings

  const buildingPromises = []; // array to store promises for each Building instance

  let textureIndex = 0;

  // Define a function that returns a Promise that resolves when the Building is loaded
  function loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture, topTexturePath) {
    return new Promise((resolve, reject) => {
      const building = new Building(buildingWidth, buildingHeight, buildingDepth, buildingTexture, topTexturePath);
      building.load().then(() => {
        resolve(building);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  // Add the first set of buildings
  for (let row = 0; row < numRows1; row++) {
    for (let col = 0; col < numCols1; col++) {
      const buildingHeight = 150 + Math.random() * 90;
      const buildingWidth = 90 + (Math.random() - 0.5) * 1.5;
      const buildingDepth = 80 + (Math.random() - 0.5) * 1.5;
      const buildingTexture = buildingTextures[textureIndex];

      // Load the Building and add it to the scene
      const buildingPromise = loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture, topTexturePath) // pass topTexturePath
        .then((building) => {
          building.setPosition(
            (col - (numCols1 - 1) / 2) * buildingWidth * 1.9,
            building.getHeight() / 2,
            (row - (numRows1 - 1) / 2) * buildingDepth * 25
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
      const buildingHeight = 160 + Math.random() * 50;
      const buildingWidth = 150 + (Math.random() - 0.5) * 5;
      const buildingDepth = 70 + (Math.random() - 0.5) * 1.5;
      const buildingTexture = buildingTextures[textureIndex];

      // Load the Building and add it to the scene
      const buildingPromise = loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture, topTexturePath)
        .then((building) => {
          building.setPosition(
            (col - (numCols2 - 1) / 2) * buildingWidth * 1.8,
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
      const buildingHeight = 85 + Math.random() * 50;
      const buildingWidth = 60 + (Math.random() - 0.5) * 1.5;
      const buildingDepth = 38 + (Math.random() - 0.5) * 1.5;
      const buildingTexture = buildingTextures[textureIndex];

      // Load the Building and add it to the scene
      const buildingPromise = loadBuilding(buildingWidth, buildingHeight, buildingDepth, buildingTexture, topTexturePath)
        .then((building) => {
          building.setPosition(
            (col - (numCols3 - 1) / 2) * buildingDepth * 1.45 - 1500, // adjust the x position to account for the second set of buildings
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

  // // Load Road 1
  // const road = new Road(1300, 150);
  // scene.add(road.group);
  // road.setPosition(250, 0.5, -1300);
  // road.setRotation(0, 0, 0);

  // Load Road 2
  const road2 = new Road(2600, 75);
  scene.add(road2.group);
  road2.setPosition(40, 5, -1250);
  road2.setRotation(0, 0, 0);

  // Load Road 3
  const road3 = new Road(2600, 75);
  scene.add(road3.group);
  road3.setPosition(40, 5, -1125);
  road3.setRotation(0, 0, 0);

  // Load Road 4
  const road4 = new Road(2600, 75);
  scene.add(road4.group);
  road4.setPosition(40, 5, 1250);
  road4.setRotation(0, 0, 0);

  // Load Road 5
  const road5 = new Road(2600, 75);
  scene.add(road5.group);
  road5.setPosition(40, 5, 1125);
  road5.setRotation(0, 0, 0);

  //   // Load Road 6
  //   const road6 = new Road(900, 75);
  //   scene.add(road6.group);
  //   road6.setPosition(-1500, 0.5, 350);
  //   road6.setRotation(0, 0, 0);

  //   // Load Road 7
  //   const road7 = new Road(900, 75);
  //   scene.add(road7.group);
  //   road7.setPosition(-1500, 0.5, 600);
  //   road7.setRotation(0, 0, 0);

  //   // Load Road 8
  //   const road8 = new Road(900, 75);
  //   scene.add(road8.group);
  //   road8.setPosition(-1500, 0.5, -350);
  //   road8.setRotation(0, 0, 0);

  //   // Load Road 9
  //   const road9 = new Road(900, 75);
  //   scene.add(road9.group);
  //   road9.setPosition(-1500, 0.5, -600);
  //   road9.setRotation(0, 0, 0);

  //   // Load Road 10
  //   const road10 = new Road(900, 75);
  //   scene.add(road10.group);
  //   road10.setPosition(-1500, 0.5, -850);
  //   road10.setRotation(0, 0, 0);

  //   // Load Road 11
  //   const road11 = new Road(900, 75);
  //   scene.add(road11.group);
  //   road11.setPosition(-1500, 0.5, -1080);
  //   road11.setRotation(0, 0, 0);

  //   // Load Road 12
  //   const road12 = new Road(900, 75);
  //   scene.add(road12.group);
  //   road12.setPosition(-1500, 0.5, -1330);
  //   road12.setRotation(0, 0, 0);


  //   // Load Road 13
  //   const road13 = new Road(900, 75);
  //   scene.add(road13.group);
  //   road13.setPosition(-1500, 0.5, 1080);
  //   road13.setRotation(0, 0, 0);

  //   // Load Road 14
  //   const road14 = new Road(900, 75);
  //   scene.add(road14.group);
  //   road14.setPosition(-1500, 0.5, -1330);
  //   road14.setRotation(0, 0, 0);

  //   // Load Road 15
  //   const road15 = new Road(2900, 75);
  //   scene.add(road15.group);
  //   road15.setPosition(-990, 0.5, 0);
  //   road15.setRotation(0, Math.PI / 2, 0);

  // Load the GLTF model and repeat it 5 times

  //     repeatModel("textures/city/models/maple_tree/scene.gltf", 5).then((repeatedModels) => {
  //   // Add the group of repeated models to the scene
  //   scene.add(repeatedModels);
  // });
}