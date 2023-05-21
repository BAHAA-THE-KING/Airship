import * as THREE from "three";

export default class Building {
  constructor(width, height, depth, textureUrl) {
    this.width = width;
    this.height = height;
    this.depth = depth;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureUrl);

    // Create material with texture
    this.material = new THREE.MeshPhongMaterial({ map: texture });

    // Create mesh with geometry and material
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  } 

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }
}