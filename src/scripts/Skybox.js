import * as THREE from "three";
import Cube from "./Cube.js";
class Skybox {
    constructor(textureUrls,scene) {
 
      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load( textureUrls[0]);
      let texture_bk = new THREE.TextureLoader().load( textureUrls[1]);
      let texture_up = new THREE.TextureLoader().load( textureUrls[2]);
      let texture_dn = new THREE.TextureLoader().load( textureUrls[3]);
      let texture_rt = new THREE.TextureLoader().load( textureUrls[4]);
      let texture_lf = new THREE.TextureLoader().load( textureUrls[5]);
        
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
         
      for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
         
      let skyboxGeo = new THREE.BoxGeometry( 500, 500, 500);
      let skybox = new THREE.Mesh( skyboxGeo, materialArray );
      scene.add( skybox );


    }
  
   
  }
  
  export default Skybox;
  