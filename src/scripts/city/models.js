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


export function loadTrees(scene, modelPath, modelScale) {
  const positions = [
    new THREE.Vector3(10, 0, -40),
    new THREE.Vector3(50, 0, -40),
    new THREE.Vector3(100, 0, -40),
    new THREE.Vector3(150, 0, -40),
    new THREE.Vector3(200, 0, -40),
    new THREE.Vector3(250, 0, -40),
    new THREE.Vector3(330, 0, -40),
    new THREE.Vector3(355, 0, -40),
    new THREE.Vector3(370, 0, -40),
    new THREE.Vector3(500, 0, -40),
    new THREE.Vector3(440, 0, -40),
    new THREE.Vector3(480, 0, -40),
    new THREE.Vector3(510, 0, -40),
    new THREE.Vector3(550, 0, -40),
    new THREE.Vector3(610, 0, -40),

    new THREE.Vector3(-10, 0, -40),
    new THREE.Vector3(-50, 0, -40),
    new THREE.Vector3(-100, 0, -40),
    new THREE.Vector3(-150, 0, -40),
    new THREE.Vector3(-200, 0, -40),
    new THREE.Vector3(-250, 0, -40),
    new THREE.Vector3(-300, 0, -40),
    new THREE.Vector3(-350, 0, -40),
    new THREE.Vector3(-400, 0, -40),
    new THREE.Vector3(-450, 0, -40),
    new THREE.Vector3(-500, 0, -40),
    new THREE.Vector3(-550, 0, -40),
    new THREE.Vector3(-600, 0, -40),
    new THREE.Vector3(-650, 0, -40),
    new THREE.Vector3(-710, 0, -40),
    new THREE.Vector3(-760, 0, -40),
    new THREE.Vector3(-820, 0, -40),
    new THREE.Vector3(-880, 0, -40),
    new THREE.Vector3(-915, 0, -40),
    new THREE.Vector3(-980, 0, -40),
    new THREE.Vector3(-1020, 0, -40),

    // another line

    new THREE.Vector3(10, 0, -250),
    new THREE.Vector3(90, 0, -250),
    new THREE.Vector3(170, 0, -250),
    new THREE.Vector3(260, 0, -250),
    new THREE.Vector3(350, 0, -250),
    new THREE.Vector3(410, 0, -250),
    new THREE.Vector3(500, 0, -250),
    new THREE.Vector3(590, 0, -250),
    new THREE.Vector3(-90, 0, -250),
    new THREE.Vector3(-200, 0, -250),
    new THREE.Vector3(-300, 0, -250),
    new THREE.Vector3(-400, 0, -250),
    new THREE.Vector3(-500, 0, -250),
    new THREE.Vector3(-600, 0, -250),
    new THREE.Vector3(-700, 0, -250),



    new THREE.Vector3(10, 0, -350),
    new THREE.Vector3(90, 0, -350),
    new THREE.Vector3(170, 0, -350),
    new THREE.Vector3(260, 0, -350),
    new THREE.Vector3(350, 0, -350),
    new THREE.Vector3(410, 0, -350),
    new THREE.Vector3(500, 0, -350),
    new THREE.Vector3(590, 0, -350),
    new THREE.Vector3(-90, 0, -350),
    new THREE.Vector3(-200, 0, -350),
    new THREE.Vector3(-300, 0, -350),
    new THREE.Vector3(-400, 0, -350),
    new THREE.Vector3(-500, 0, -350),
    new THREE.Vector3(-600, 0, -350),
    new THREE.Vector3(-700, 0, -350),



    // another line

    new THREE.Vector3(10, 0, 250),
    new THREE.Vector3(90, 0, 250),
    new THREE.Vector3(170, 0, 250),
    new THREE.Vector3(260, 0, 250),
    new THREE.Vector3(350, 0, 250),
    new THREE.Vector3(410, 0, 250),
    new THREE.Vector3(500, 0, 250),
    new THREE.Vector3(590, 0, 250),
    new THREE.Vector3(-90, 0, 250),
    new THREE.Vector3(-200, 0, 250),
    new THREE.Vector3(-300, 0, 250),
    new THREE.Vector3(-400, 0, 250),
    new THREE.Vector3(-500, 0, 250),
    new THREE.Vector3(-600, 0, 250),
    new THREE.Vector3(-700, 0, 250),



    new THREE.Vector3(10, 0, 350),
    new THREE.Vector3(90, 0, 350),
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

  const scale = [new THREE.Vector3(50, 50, 50)];

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

export function loadLamps(scene, modelPath2, modelScale2) {
  const positions = [
    new THREE.Vector3(40, 0.1, 35),
    new THREE.Vector3(80, 0, -20),
    new THREE.Vector3(120, 0, -20),
    new THREE.Vector3(160, 0, -20),
    new THREE.Vector3(200, 0, -20),
    new THREE.Vector3(240, 0, -20),
    new THREE.Vector3(280, 0, -20),
    new THREE.Vector3(320, 0, -20),
    new THREE.Vector3(360, 0, -20),
    new THREE.Vector3(400, 0, -20),
    new THREE.Vector3(440, 0, -20),
    new THREE.Vector3(480, 0, -20),
    new THREE.Vector3(520, 0, -20),
    new THREE.Vector3(100, 0, -170),
    new THREE.Vector3(700, 0, -20),
    new THREE.Vector3(750, 0, -20),
    new THREE.Vector3(800, 0, -20),
    new THREE.Vector3(850, 0, -20),
    new THREE.Vector3(900, 0, -20),
    new THREE.Vector3(950, 0, -20)
  ];

  const scale = [new THREE.Vector3(0.6, 0.6, 0.6)];

  for (let i = 0; i < 20; i++) {
    loader.load(
      modelPath2,
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
      modelScale2 // Pass the modelScale as the sixth argument
    );
  }

}
