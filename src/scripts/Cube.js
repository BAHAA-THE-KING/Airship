import * as THREE from "three";

class Cube{
     constructor(width,height,depth,color){
                this.geometry = new THREE.BoxGeometry(width,height,depth);
                this.material = new THREE.MeshBasicMaterial({ color });
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                }
     };

export default Cube;