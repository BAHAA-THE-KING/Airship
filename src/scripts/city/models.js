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


export function loadTrees(scene, modelPath, modelScale) {
  const positions = [
    new THREE.Vector3(10, 0, -40),
    new THREE.Vector3(100, 0, -40),
    new THREE.Vector3(300, 0, -40),
    new THREE.Vector3(500, 0, -40),
    new THREE.Vector3(-100, 0, -40),
    new THREE.Vector3(-200, 0, -40),
    new THREE.Vector3(-400, 0, -40),
    new THREE.Vector3(-500, 0, -40),


    // another line

    new THREE.Vector3(10, 0, -250),
    new THREE.Vector3(150, 0, -250),
    new THREE.Vector3(250, 0, -250),
    new THREE.Vector3(300, 0, -250),
    new THREE.Vector3(-500, 0, -250),
    new THREE.Vector3(-600, 0, -250),
    new THREE.Vector3(-750, 0, -250),
    new THREE.Vector3(-800, 0, -250),



    new THREE.Vector3(10, 0, -350),
    new THREE.Vector3(100, 0, -350),
    new THREE.Vector3(300, 0, -350),
    new THREE.Vector3(500, 0, -350),
    new THREE.Vector3(600, 0, -350),
    new THREE.Vector3(700, 0, -350),
    new THREE.Vector3(-100, 0, -350),
    new THREE.Vector3(-300, 0, -350),
    new THREE.Vector3(-400, 0, -350),
    new THREE.Vector3(-600, 0, -350),
    new THREE.Vector3(-700, 0, -350),



    // another line

    new THREE.Vector3(10, 0, 250),
    new THREE.Vector3(170, 0, 250),
    new THREE.Vector3(260, 0, 250),
    new THREE.Vector3(350, 0, 250),
    new THREE.Vector3(410, 0, 250),
    new THREE.Vector3(500, 0, 250),
    new THREE.Vector3(590, 0, 250),
    new THREE.Vector3(-200, 0, 250),
    new THREE.Vector3(-300, 0, 250),
    new THREE.Vector3(-400, 0, 250),
    new THREE.Vector3(-500, 0, 250),
    new THREE.Vector3(-600, 0, 250),
    new THREE.Vector3(-700, 0, 250),



    new THREE.Vector3(10, 0, 350),
    new THREE.Vector3(170, 0, 350),
    new THREE.Vector3(260, 0, 350),
    new THREE.Vector3(350, 0, 350),
    new THREE.Vector3(410, 0, 350),
    new THREE.Vector3(500, 0, 350),
    new THREE.Vector3(590, 0, 350),
    new THREE.Vector3(-90, 0, 350),
    new THREE.Vector3(-200, 0, 350),
    new THREE.Vector3(-300, 0, 350),
    new THREE.Vector3(-400, 0, 350),
    new THREE.Vector3(-500, 0, 350),
    new THREE.Vector3(-600, 0, 350),
    new THREE.Vector3(-700, 0, 350),


  ];

  const scale = [new THREE.Vector3(30, 30, 30)];

  for (let i = 0; i < 61; i++) {
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