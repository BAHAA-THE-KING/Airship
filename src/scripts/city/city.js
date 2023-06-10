import * as THREE from "three";
import { Color } from "three";
import Building from "./Building";
import Road from "./Road";
import Street from "./streets";
import { loadLamps, loadModels } from "./models";
import { loadTrees } from "./models";


export default function createCity(scene) {


  //Load Models
  const modelPaths = [
    "/textures/city/models/football_stadium/scene.gltf",
    // "/textures/city/models/beech_tree/scene.gltf",
    "/textures/city/models/sidewalk/scene.gltf",
    "/textures/city/models/sidewalk/scene.gltf",//2
    "/textures/city/models/sidewalk/scene.gltf",//3
    "/textures/city/models/sidewalk/scene.gltf",//4
    "/textures/city/models/sidewalk/scene.gltf",//4
    "/textures/city/models/sidewalk/scene.gltf",//4
    "/textures/city/models/sidewalk/scene.gltf",//4
    "/textures/city/models/sidewalk/scene.gltf",//4

    "/textures/city/models/european_buildings_asset_pack_3/scene.gltf",
    "/textures/city/models/city/scene.gltf",
    "/textures/city/models/imaginary_city_i/scene.gltf",
    "/textures/city/models/tommy_gta_vice_city/scene.gltf",


  ];

  const modelPositions = [
    new THREE.Vector3(-50, 0.1, -600),
    // new THREE.Vector3(50, 0.1, 20),
    //sidewalk
    new THREE.Vector3(-96, -2, 43),
    new THREE.Vector3(-96, -2, 275),
    new THREE.Vector3(-96, -2, -260),
    new THREE.Vector3(-96, -2, -525),
    new THREE.Vector3(-96, -2, 545),
    new THREE.Vector3(-96, -2, -25),
    new THREE.Vector3(-96, -2, 341),
    new THREE.Vector3(-96, -2, -325),

    new THREE.Vector3(900, 0.1, 10),
    new THREE.Vector3(-780, 5, 110),
    new THREE.Vector3(10, 5, 1350),
    new THREE.Vector3(10, 1, 2),



  ];

  const modelScales = [
    new THREE.Vector3(2, 2, 2),
    // new THREE.Vector3(4, 4, 4),
    new THREE.Vector3(2, 26, 3),
    new THREE.Vector3(2, 26, 3),
    new THREE.Vector3(2, 26, 3),
    new THREE.Vector3(2, 26, 3),
    new THREE.Vector3(2, 26, 3),
    new THREE.Vector3(2, 26, 3),
    new THREE.Vector3(2, 26, 3),
    new THREE.Vector3(2, 26, 3),

    new THREE.Vector3(4, 4, 4),
    new THREE.Vector3(0.1, 0.1, 0.1),
    new THREE.Vector3(1.5, 1.5, 1.5),
    new THREE.Vector3(10, 10, 10),

  ];

  const modelRotation = [
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI),
    // new THREE.Vector3(Math.PI /2 , Math.PI  , Math.PI/2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),

    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI / 2),

  ];
  loadModels(scene, modelPaths, modelPositions, modelScales, modelRotation);

  // Load Trees

  const modelPath = "/textures/city/models/stylized_tree/scene.gltf";
  const modelScale = 50;
  loadTrees(scene, modelPath, modelScale);
  // Load Lamps

  const modelPath2 = "/textures/city/models/street_lamp/scene.gltf";
  const modelScale2 = 0.6;
  //  loadLamps(scene, modelPath2, modelScale2)

  // Create a plane for the ground
  const groundGeometry = new THREE.PlaneGeometry(3000, 3000);

  // Create a material with a plain color and apply it to the ground plane
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x3b3b3b });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2; // Rotate the plane to lie flat on the ground
  scene.add(groundMesh);

  const buildingHeights = [100, 50, 80, 60, 50, 65, 70, 55];
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
  const buildingWidth = 16;
  const buildingDepth = 30;

  let heightIndex = 0;
  let textureIndex = 0;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const buildingHeight = buildingHeights[heightIndex];
      const buildingTexture = buildingTextures[textureIndex];

      const building = new Building(buildingWidth, buildingHeight, buildingDepth, buildingTexture);
      heightIndex = (heightIndex + 1) % buildingHeights.length; // cycle through the height array
      textureIndex = (textureIndex + 1) % buildingTextures.length; // cycle through the texture array

      building.setPosition(
        (col - (numCols - 1) / 2) * buildingWidth * 4,
        building.getHeight() / 2, // update the y position to use the new height of the building
        (row - (numRows - 1) / 2) * buildingDepth * 10
      );
      building.addToScene(scene);

      const buildings2 = new Building(buildingWidth, buildingHeight, buildingDepth, buildingTexture);
      heightIndex = (heightIndex + 1) % buildingHeights.length; // cycle through the height array
      textureIndex = (textureIndex + 1) % buildingTextures.length; // cycle through the texture array

      buildings2.setPosition(
        (col - (numCols - 1) / 2) * buildingWidth * 5,
        building.getHeight() / 2, // update the y position to use the new height of the building
        (row - (numRows - 1) / 2) * buildingDepth * 5
      );
      buildings2.addToScene(scene);

      // Load road1
      const texturePath = '/textures/city/asphalt.jpg';

      const road = new Road(1500, 50, texturePath);
      scene.add(road.group);

      road.setPosition(-80, 0.5, 500);
      road.setRotation(0, 0, 0);



      // Load road2
      const texturePath2 = '/textures/city/asphalt.jpg';

      const road2 = new Road(1500, 50, texturePath2);
      scene.add(road2.group);

      road2.setPosition(-90, 0.5, 0);
      road2.setRotation(0, 0, 0);


      // Load road3
      const texturePath3 = '/textures/city/asphalt.jpg';

      const road3 = new Road(1500, 50, texturePath3);
      scene.add(road3.group);

      road3.setPosition(-80, 0.5, -500);
      road3.setRotation(0, 0, 0);



      // Load road4
      const texturePath4 = '/textures/city/asphalt.jpg';

      const road4 = new Road(1500, 50, texturePath4);
      scene.add(road4.group);

      road4.setPosition(-80, 0.5, -300);
      road4.setRotation(0, 0, 0);



      // Load road5
      const texturePath5 = '/textures/city/asphalt.jpg';

      const road5 = new Road(1500, 50, texturePath4);
      scene.add(road5.group);

      road5.setPosition(-80, 0.5, 300);
      road5.setRotation(0, 0, 0);



    }
  }

}