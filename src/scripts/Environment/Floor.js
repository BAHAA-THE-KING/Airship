import * as THREE from "three";
class Floor {
   constructor(size, color) {
      this.geometry = new THREE.PlaneGeometry(size, size, size / 10, size / 10);
      this.material = new THREE.MeshStandardMaterial({ color: color });
      this.mesh = new THREE.Mesh(this.geometry, this.material);

      this.mesh.rotation.x = -Math.PI / 2;
   };

   addToScene(scene) {
      scene.add(this.mesh);
   };
};

export default Floor;