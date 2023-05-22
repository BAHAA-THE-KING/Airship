import * as THREE from "three";

export default class Building {
  constructor(width, height, depth, textureUrl) {
    this.width = width;
    this.height = height;
    this.depth = depth;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureUrl);

    // Create material with texture for the sides
    const sideMaterial = new THREE.MeshPhongMaterial({ map: texture });

    // Create material without texture for the top and bottom
    const topBottomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    // Create mesh with geometry and materials
    this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.mesh = new THREE.Mesh(this.geometry, [
      sideMaterial, // right
      sideMaterial, // left
      topBottomMaterial, // top
      topBottomMaterial, // bottom
      sideMaterial, // front
      sideMaterial, // back
    ]);
  } 

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }

  getHeight() {
    return this.height;
  }
}