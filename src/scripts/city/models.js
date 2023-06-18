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
// export async function loadTrees(scene, modelPath, modelScale) {
//   const treePositions = [
//     new THREE.Vector3(10, 0, -40),
//     new THREE.Vector3(100, 0, -40),
//     new THREE.Vector3(300, 0, -40),
//     new THREE.Vector3(500, 0, -40),
//     new THREE.Vector3(-100, 0, -40),
//     new THREE.Vector3(-200, 0, -40),
//     new THREE.Vector3(-400, 0, -40),
//     new THREE.Vector3(-500, 0, -40),
//     // Add more tree positions here
//   ];

//   try {
//     const gltf = await loader.loadAsync(modelPath);
//     const model = gltf.scene.children[0];

//     // Create the InstancedMesh
//     const treeMesh = new THREE.InstancedMesh(model.geometry, model.material, treePositions.length);
//     treeMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // Set usage to DynamicDraw for performance

//     // Set the position and scale for each instance
//     for (let i = 0; i < treePositions.length; i++) {
//       const position = treePositions[i];
//       const matrix = new THREE.Matrix4();
//       matrix.setPosition(position);
//       matrix.scale(modelScale);
//       treeMesh.setMatrixAt(i, matrix);
//     }

//     scene.add(treeMesh);
//   } catch (error) {
//     console.log("An error happened", error);
//   }
// }