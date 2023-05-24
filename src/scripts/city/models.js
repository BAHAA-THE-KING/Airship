import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function loadModels(scene, modelPaths, modelPositions, modelScales, modelRotation) {
  
  modelPaths.forEach((path, index) => {
    loader.load(path, function (gltf) {
      const mesh = gltf.scene.children[0];
      mesh.position.copy(modelPositions[index]);
      mesh.rotation.set(modelRotation[index].x, modelRotation[index].y, modelRotation[index].z);
      mesh.scale.set(modelScales[index].x, modelScales[index].y, modelScales[index].z);
      scene.add(mesh);
    }, undefined, function (error) {
      console.error(error);
    });
  }); 
}