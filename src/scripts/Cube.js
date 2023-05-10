import * as THREE from "three";
class Cube {
  constructor(size, color) {
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({ color, roughness: 0.4 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.moveTo(0,0.5,0);
  };

  moveTo(x, y, z) {
    this.mesh.position.set(x, y, z);
  };

  addToScene(scene) {
    scene.add(this.mesh);
  };

  rotate(x, y, z) {
    this.mesh.rotation.x += x;
    this.mesh.rotation.y += y;
    this.mesh.rotation.z += z;
  };
};

export default Cube;