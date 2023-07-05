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