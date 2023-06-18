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