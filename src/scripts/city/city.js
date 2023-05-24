import * as THREE from "three";
import { Color } from "three";
import Building from "./Building";
import Road from "./Road";
import Street from "./streets";



export default function createCity(scene) {

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
    const numCols = 10;
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
          (col - (numCols - 1) / 2) * buildingWidth *3,
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
        
      
        }

      }

    }