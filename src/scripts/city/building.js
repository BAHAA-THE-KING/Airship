import * as THREE from "three";

export default class Building {
  constructor(width, height, depth, textureUrls) {
    this.width = width;
    this.height = height;
    this.depth = depth;

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const texturePromises = textureUrls.map((url) => textureLoader.loadAsync(url));

    // Create materials with textures for the sides
    Promise.all(texturePromises).then((textures) => {
      const sideMaterials = textures.map((texture) => new THREE.MeshPhongMaterial({ map: texture }));

      // Create material without texture for the top and bottom
      const topBottomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

      // Create mesh with geometry and materials
      this.geometry = new THREE.BoxGeometry(width, height, depth);
      this.mesh = new THREE.Mesh(this.geometry, [
        sideMaterials[0], // right
        sideMaterials[1], // left
        topBottomMaterial, // top
        topBottomMaterial, // bottom
        sideMaterials[2], // front
        sideMaterials[3], // back
      ]);
    });
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