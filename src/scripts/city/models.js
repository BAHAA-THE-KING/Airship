import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();
export async function loadModels(scene, modelPaths, modelPositions, modelScales, modelRotation) {
  for (let i = 0; i < modelPaths.length; i++) {
    const path = modelPaths[i];
    const position = modelPositions[i];
    const scale = modelScales[i];
    const rotation = modelRotation[i];
    const gltf = await new Promise((resolve, reject) => {
      loader.load(path, resolve, undefined, reject);
    });
    const mesh = gltf.scene.children[0];
    mesh.position.copy(position);
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    mesh.scale.set(scale.x, scale.y, scale.z);
    scene.add(mesh);
  }
}
// export function repeatModel(url, count) {
//   // Load the GLTF model using a promise
//   return new Promise((resolve, reject) => {
//     const loader = new THREE.GLTFLoader();
//     loader.load(url, (gltf) => {
//       // Create a group to hold the repeated models
//       const group = new THREE.Group();

//       // Add the original model to the group
//       group.add(gltf.scene);

//       // Repeat the model and add each copy to the group
//       for (let i = 1; i < count; i++) {
//         const copy = gltf.scene.clone(); // Clone the original model
//         copy.position.set(i * 10, 0, 0); // Set the position of the copy
//         group.add(copy); // Add the copy to the group
//       }

//       // Resolve the promise with the group of repeated models
//       resolve(group);
//     }, undefined, reject);
//   });
// }