import * as THREE from "three";
import { Color } from "three";
import Building from "./Building";
import Road from "./Road";
import Street from "./streets";
import { loadLamps, loadModels } from "./models";
import { loadTree } from "./models";


export default function createCity(scene) {


    //Load Models
  const modelPaths = [
    "/textures/city/models/football_stadium/scene.gltf",
    // "/textures/city/models/beech_tree/scene.gltf",
    "/textures/city/models/sidewalk/scene.gltf",
    "/textures/city/models/european_buildings_asset_pack_3/scene.gltf"

  ];

  const modelPositions = [
    new THREE.Vector3(-50,0.1, -600),
    // new THREE.Vector3(50, 0.1, 20),
    new THREE.Vector3(295, -2, 20),
    new THREE.Vector3(900, 0.1, 10)
    

  ];

  const modelScales = [
    new THREE.Vector3(2, 2, 2),
    // new THREE.Vector3(4, 4, 4),
    new THREE.Vector3(2, 15, 3),
    new THREE.Vector3(4, 4, 4),

  ];

  const modelRotation = [
    new THREE.Vector3(Math.PI /2, Math.PI, Math.PI),
    // new THREE.Vector3(Math.PI /2 , Math.PI  , Math.PI/2),
    new THREE.Vector3(Math.PI /2 , Math.PI  , Math.PI),
    new THREE.Vector3(Math.PI /2 , Math.PI  , Math.PI/2),

  ];
  loadModels(scene, modelPaths, modelPositions, modelScales, modelRotation);
  
  // Load Trees

  const modelPath = "/textures/city/models/stylized_tree/scene.gltf";
  const modelScale = 50;
  loadTree(scene, modelPath, modelScale);
  // Load Trees

  const modelPath2 = "/textures/city/models/street_lamp/scene.gltf";
  const modelScale2 = 0.6;
  // loadLamps(scene, modelPath2, modelScale2)

    // Create a plane for the ground
    const groundGeometry = new THREE.PlaneGeometry(2000, 2000);

    // Create a material with a plain color and apply it to the ground plane
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x3b3b3b });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2; // Rotate the plane to lie flat on the ground
    scene.add(groundMesh);

    const buildingHeights = [40, 30, 60, 50, 40,7,15, 27];
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

    const numRows = 6;
    const numCols = 20;
    const buildingWidth = 15;
    const buildingDepth = 30;

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
          (col - (numCols - 1) / 2) * buildingWidth *4,
          building.getHeight() / 2, // update the y position to use the new height of the building
          (row - (numRows - 1) / 2) * buildingDepth * 10
        );
        building.addToScene(scene);

            const buildings2 = new Building(buildingWidth, buildingHeight, buildingDepth, buildingTexture);
        heightIndex = (heightIndex + 1) % buildingHeights.length; // cycle through the height array
        textureIndex = (textureIndex +1) % buildingTextures.length; // cycle through the texture array

        buildings2.setPosition(
          (col - (numCols - 1) / 2) * buildingWidth *5 ,
          building.getHeight() / 2 , // update the y position to use the new height of the building
          (row - (numRows - 1) / 2) * buildingDepth * 5
        );
        buildings2.addToScene(scene);
        

        const texturePath = '/textures/city/asphalt.jpg';

        const road = new Road(800, 50, texturePath); // Create a road with a length of 10, width of 5, and texture from the given path        
        scene.add(road.group); // Add the road group to the scene

        road.setPosition(-300, 0.5, 0); // Set the position of the road
        road.setRotation(0, 0, 0); // Set the rotation of the road

          
        }

      }

    }