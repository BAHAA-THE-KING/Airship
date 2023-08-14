import * as THREE from 'three';
import TextureManager from "../utils/TextureManager";
import MaterialManager from '../utils/MaterialManager';


function makeGround(scene) {
   // Load the texture for the ground
   TextureManager.loadTexture("/textures/city/Grass2.jpg")
      .then((texture) => {
         // Scale the texture to fit the ground plane
         texture.repeat.set(5, 5);
         texture.wrapS = THREE.RepeatWrapping;
         texture.wrapT = THREE.RepeatWrapping;

         // Create a material with the texture and apply it to the ground plane
         const groundMaterial = new THREE.MeshStandardMaterial({ map: texture });
         MaterialManager.save("ground", groundMaterial);

         // Create a plane for the ground
         const groundGeometry = new THREE.PlaneGeometry(2500, 3000);

         const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
         groundMesh.rotation.x = -Math.PI / 2;

         groundMesh.receiveShadow = true;
         groundMesh.castShadow = true;

         scene.add(groundMesh);
      });


   // Load the texture for the ground
   TextureManager.loadTexture("/textures/city/grass2.jpg")
      .then((texture) => {
         // Scale the texture to fit the ground plane
         texture.repeat.set(5, 5);
         texture.wrapS = THREE.RepeatWrapping;
         texture.wrapT = THREE.RepeatWrapping;

         // Create a material with the texture and apply it to the ground plane
         const groundMaterial = new THREE.MeshStandardMaterial({ map: texture });
         MaterialManager.save("ground", groundMaterial);

         // Create a plane for the ground
         const groundGeometry = new THREE.PlaneGeometry(2500, 3000);

         const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
         groundMesh.position.x = -2000;
         groundMesh.position.y = 0;

         groundMesh.rotation.x = -Math.PI / 2;
         
         groundMesh.receiveShadow = true;
         groundMesh.castShadow = true;

         scene.add(groundMesh);
      });


   // Load the texture for the ground
   TextureManager.loadTexture("/textures/city/sand3.jpg")
      .then((texture) => {
         // Scale the texture to fit the ground plane
         texture.repeat.set(5, 1);
         texture.wrapS = THREE.RepeatWrapping;
         texture.wrapT = THREE.RepeatWrapping;

         // Create a material with the texture and apply it to the ground plane
         const groundMaterial = new THREE.MeshStandardMaterial({ map: texture });
         MaterialManager.save("ground", groundMaterial);

         // Create a plane for the ground
         const groundGeometry = new THREE.PlaneGeometry(3000, 500);

         const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
         groundMesh.position.x = 1500.01;
         groundMesh.position.y = 0;

         groundMesh.rotation.x = -Math.PI / 2;
         groundMesh.rotation.z = Math.PI / 2;

         groundMesh.receiveShadow = true;
         groundMesh.castShadow = true;

         scene.add(groundMesh);
      });

   // Load the texture for the ground
   TextureManager.loadTexture("/textures/city/sand3.jpg")
      .then((texture) => {
         // Scale the texture to fit the ground plane
         texture.repeat.set(5, 1);
         texture.wrapS = THREE.RepeatWrapping;
         texture.wrapT = THREE.RepeatWrapping;

         // Create a material with the texture and apply it to the ground plane
         const groundMaterial = new THREE.MeshStandardMaterial({ map: texture });
         MaterialManager.save("ground", groundMaterial);

         // Create a plane for the ground
         const groundGeometry = new THREE.PlaneGeometry(2700, 500);

         const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
         groundMesh.position.x = -10;
         groundMesh.position.z = -1600;
         groundMesh.position.y = 0;

         groundMesh.rotation.x = -Math.PI / 2;
         groundMesh.rotation.z = Math.PI;

         groundMesh.receiveShadow = true;
         groundMesh.castShadow = true;

         scene.add(groundMesh);
      });
   // Load the texture for the ground
   TextureManager.loadTexture("/textures/city/sand3.jpg")
      .then((texture) => {
         // Scale the texture to fit the ground plane
         texture.repeat.set(5, 1);
         texture.wrapS = THREE.RepeatWrapping;
         texture.wrapT = THREE.RepeatWrapping;

         // Create a material with the texture and apply it to the ground plane
         const groundMaterial = new THREE.MeshStandardMaterial({ map: texture });
         MaterialManager.save("ground", groundMaterial);

         // Create a plane for the ground
         const groundGeometry = new THREE.PlaneGeometry(2700, 500);

         const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
         groundMesh.position.x = 30;
         groundMesh.position.z = 1700;
         groundMesh.position.y = 2;

         groundMesh.rotation.x = -Math.PI / 2;
         groundMesh.rotation.z = Math.PI * 2;

         groundMesh.receiveShadow = true;
         groundMesh.castShadow = true;


         scene.add(groundMesh);
      });
   // // Load the texture for the ground
   // TextureManager.loadTexture("/textures/city/sand3.jpg")
   // .then((texture) => {
   //    // Scale the texture to fit the ground plane
   //    texture.repeat.set(1, 1);
   //    texture.wrapS = THREE.RepeatWrapping;
   //    texture.wrapT = THREE.RepeatWrapping;

   //    // Create a material with the texture and apply it to the ground plane
   //    const groundMaterial = new THREE.MeshStandardMaterial({ map: texture });
   //    MaterialManager.save("ground", groundMaterial);

   //    // Create a plane for the ground
   //    const groundGeometry = new THREE.PlaneGeometry(350, 450);

   //    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
   //    groundMesh.position.x = 1550;
   //    groundMesh.position.z = 1700;
   //    groundMesh.position.y = 2;

   //    groundMesh.rotation.x = -Math.PI / 2 ;
   //    groundMesh.rotation.z = Math.PI *2 ;

   //    groundMesh.receiveShadow = true;
   //    groundMesh.castShadow = true;

   //    scene.add(groundMesh);
   // });


}

export default makeGround;