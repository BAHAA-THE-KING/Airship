// import * as THREE from "three";


// export default function CreateLandscape(scene) {

    
//   // Create the terrain material
//   const textureLoader = new THREE.TextureLoader();
//   const heightmapTexture = textureLoader.load('/textures/landscape/HeightMapGray.png');
//   const terrainMaterial = new THREE.MeshBasicMaterial({ map: heightmapTexture });

//   // Create the terrain geometry
//   const terrainGeometry = new THREE.PlaneGeometry(1025, 1025, 20, 30); // Adjust the size and resolution as needed

//   // Get the vertices of the terrain geometry
//   const vertices = terrainGeometry.attributes.position.array;

//   // Get the grayscale values from the heightmap and apply them to the terrain vertices
//   for (let i = 0; i < vertices.length; i += 3) {
//     const x = vertices[i];
//     const y = vertices[i + 1];
//     const grayscale = getGrayscaleValue(heightmapTexture, x, y);
//     const z = grayscale * 200; // Scale the grayscale value to the desired height range

//     vertices[i + 2] = z;
//   }

//   // Create the terrain mesh
//   const terrainTexture = textureLoader.load('/textures/landscape/HeightMap.png');
//   const terrainMaterial2 = new THREE.MeshBasicMaterial({ map: terrainTexture });
//   const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial2);

//   terrainMesh.receiveShadow = true;
//   terrainMesh.castShadow = true;

//   terrainMesh.rotation.x = Math.PI / 2; // Rotate around the x-axis
//   terrainMesh.rotation.y = Math.PI; // Rotate around the y-axis
//   terrainMesh.rotation.z = Math.PI; // Rotate around the z-axis

//   scene.add(terrainMesh);
// }

// function getGrayscaleValue(texture, x, y) {
//   const width = texture.image.width;
//   const height = texture.image.height;
//   const index = (x + y * width) * 4;
//   const pixelData = texture.image.data;

//   const grayscale = (pixelData[index] + pixelData[index + 1] + pixelData[index + 2]) / 3 / 255;
//   return grayscale;
// }
