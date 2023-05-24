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

  
  export function loadTree(scene, modelPath, modelScale) {
    const positions = [
      new THREE.Vector3(10, 0, -20),
      new THREE.Vector3(50, 0, -20),
      new THREE.Vector3(100, 0, -20),
      new THREE.Vector3(150, 0, -20),
      new THREE.Vector3(200, 0, -20),
      new THREE.Vector3(250, 0, -20),
      new THREE.Vector3(300, 0, -20),
      new THREE.Vector3(-10, 0, -20),
      new THREE.Vector3(-50, 0, -20),
      new THREE.Vector3(-100, 0, -20),
      new THREE.Vector3(-150,0, -20),
      new THREE.Vector3(-200, 0, -20),
      new THREE.Vector3(-250, 0, -20),
      new THREE.Vector3(100, 0, -170),
      new THREE.Vector3(700, 0, -20),
      new THREE.Vector3(750, 0, -20),
      new THREE.Vector3(800, 0, -20),
      new THREE.Vector3(850, 0, -20),
      new THREE.Vector3(900, 0, -20),
      new THREE.Vector3(950, 0, -20)
    ];
    
    const scale = [new THREE.Vector3(50, 50, 50)];
    
    for (let i = 0; i < 20; i++) {
      loader.load(
        modelPath,
        function (gltf) {
          const model = gltf.scene.children[0];
          model.position.copy(positions[i]);
          model.scale.copy(scale[0]);
          scene.add(model);
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.log("An error happened", error);
        },
        null,  // Pass null as the fifth argument to use the default scaling
        modelScale // Pass the modelScale as the sixth argument
      );
    }
  }