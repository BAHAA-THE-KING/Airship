import * as THREE from "three";

export default class Street {
  constructor(length, width, color) {
    this.length = length;
    this.width = width;
    this.color = color;

    this.geometry = new THREE.PlaneGeometry(length, width);
    this.material = new THREE.MeshPhongMaterial({ color: color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.mesh.rotation.set(x, y, z);
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }
}