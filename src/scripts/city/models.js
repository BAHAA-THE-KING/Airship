import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function loadModels(scene, modelPaths, modelPositions) {
  modelPaths.forEach((path, index) => {
    loader.load(path, function (gltf) {
      const mesh = gltf.scene.children[0];
      mesh.position.copy(modelPositions[index]);
      mesh.scale.set(4, 4, 4);
      scene.add(mesh);
    }, undefined, function (error) {
      console.error(error);
    });
  }); 
}