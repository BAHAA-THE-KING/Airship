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
         const groundGeometry = new THREE.PlaneGeometry(2500, 2500);

         const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
         groundMesh.rotation.x = -Math.PI / 2;

         scene.add(groundMesh);
      });
}

export default makeGround;