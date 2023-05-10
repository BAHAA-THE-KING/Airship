import * as THREE from "three";
class Skybox {
    constructor(textureUrls,scene) {
      const cubeTextureLoader = new THREE.CubeTextureLoader();

      /**
       * Environment map
       */
      const environmentMap = cubeTextureLoader.load([
        textureUrls[0],
        textureUrls[1],
        textureUrls[2],
        textureUrls[3],
        textureUrls[4],
        textureUrls[5],
      ]);
      scene.background = environmentMap;
    }
  
   
  }
  
  export default Skybox;
  