import * as THREE from "three";
import { Color } from "three";
import Building from "./Building";
import Road from "./Road";
import Street from "./streets";
import { loadModels } from "./models";



  const modelPaths = [
    "/textures/city/models/football_stadium/scene.gltf",
    // "/textures/city/models/low_poly_street_lamps_collection/scene.gltf",

  ];

  const modelPositions = [
    new THREE.Vector3(300, 1, 0),
    new THREE.Vector3(50, 1, 0),
    new THREE.Vector3(100, 0, 0)
  ];



export default function createCity(scene) {

  loadModels(scene, modelPaths,modelPositions);

// Create a plane for the ground
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);

// Create a material with a plain color and apply it to the ground plane
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x3b3b3b });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2; // Rotate the plane to lie flat on the ground
scene.add(groundMesh);

const buildingHeights = [8, 10, 20, 50, 6,7,15, 27];
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
   "/textures/city/building_modern.png"

];

const numRows = 22;
const numCols = 6;
const buildingWidth = 15;
const buildingDepth = 20;

let heightIndex = 0;
let textureIndex = 0;

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    const buildingHeight = buildingHeights[heightIndex];
    const buildingTexture = buildingTextures[textureIndex];

    const building = new Building(buildingWidth, buildingHeight, buildingDepth, buildingTexture);
    heightIndex = (heightIndex + 1) % buildingHeights.length; // cycle through the height array
    textureIndex = (textureIndex +1) % buildingTextures.length; // cycle through the texture array

    building.setPosition(
      (col - (numCols - 1) / 2) * buildingWidth * 5,
      building.getHeight() / 2, // update the y position to use the new height of the building
      (row - (numRows - 1) / 2) * buildingDepth * 1.1
    );
    building.addToScene(scene);
  }
}

  // const shop1 = new Building(10, 3, 5, "/textures/textures/shop_front6.png");
  // shop1.setPosition(-50, 1.5, 50);
  // shop1.addToScene(scene);

  // const shop2 = new Building(30, 3, 8, "/textures/textures/shop_front6.png");
  // shop2.setPosition(50, 1.5, 50);
  // shop2.addToScene(scene);

  // const skyscraper = new Building(10, 50, 12, "/textures/textures/skyscraper2.jpeg");
  // skyscraper.setPosition(50, 20, -50);
  // skyscraper.addToScene(scene);

  // const building3 = new Building(20, 30, 10, "/textures/textures/apartments4.png");
  // building3.setPosition(-60, 15, -30);
  // building3.addToScene(scene);

  // const building4 = new Building(30, 20, 8, "/textures/textures/photos_2017_7_9_fst_building-texture-windows.jpg");
  // building4.setPosition(-20, 10, -30);
  // building4.addToScene(scene);

  // const shop3 = new Building(10, 3, 5, "/textures/textures/shop_front6.png");
  // shop3.setPosition(20, 1.5, -30);
  // shop3.addToScene(scene);

  // const shop4 = new Building(30, 3, 8, "/textures/textures/shop_front6.png");
  // shop4.setPosition(50, 1.5, -30);
  // shop4.addToScene(scene);

  // const skyscraper2 = new Building(10, 50, 12, "/textures/textures/skyscraper2.jpeg");
  // skyscraper2.setPosition(80, 25, -30);
  // skyscraper2.addToScene(scene);

  // Create roads for the city
    const road1 = new Road(500,20,"/textures/city/asphalt.jpg");
    road1.surfaceMaterial.map.repeat.set(5,1); // set texture repeat
    road1.setPosition(150,0.1,0);
    road1.setRotation( Math.PI *2,Math.PI/2  , 0);
    road1.addToScene(scene);

  // Create streets for the city
  const street1 = new Street(1000, 10, 0x8080); // gray
  street1.setPosition(-50, 0, 0);
  street1.setRotation(Math.PI / 2 , 0, 0);
  // street1.addToScene(scene);
}