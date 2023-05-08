import * as THREE from "three";
class Cube {
     constructor(x, y, z, size, color) {
       this.geometry = new THREE.BoxGeometry(size, size, size);
       this.material = new THREE.MeshBasicMaterial({ color: color });
       this.mesh = new THREE.Mesh(this.geometry, this.material);
       this.mesh.position.set(x, y, z);
     }
   
     addToScene(scene) {
       scene.add(this.mesh);
     }
   
     rotate(x, y, z) {
       this.mesh.rotation.x += x;
       this.mesh.rotation.y += y;
       this.mesh.rotation.z += z;
     }
   }
   
   export default Cube;
   