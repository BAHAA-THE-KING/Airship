import * as THREE from "three";
import MaterialManager from "../utils/MaterialManager";

const materialManager = new MaterialManager();

class Building {
  constructor(width, height, depth, sideTexturePath, topTexturePath) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.sideTexturePath = sideTexturePath;
    this.topTexturePath = topTexturePath;
    this.mesh = new THREE.Object3D();
    this.loaded = false;
    this.promise = this.load();
  }

  async load() {
    try {
      const sideMaterial = await materialManager.getMaterial(this.sideTexturePath);
      const topMaterial =  await materialManager.getMaterial(this.topTexturePath);
      const sideMaterials = [
        sideMaterial,
        sideMaterial,
        topMaterial,
        undefined,
        sideMaterial,
        sideMaterial
      ];

      const sideGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);

      const sideMesh = new THREE.Mesh(sideGeometry, sideMaterials);

      this.mesh.add(sideMesh);
      this.loaded = true;
      return this;
    } catch (error) {
      console.error(`Failed to load textures ${this.sideTexturePath} and ${this.topTexturePath}:`, error);
      throw error;
    }
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

  getHeight() {
    return this.height;
  }

  isLoaded() {
    return this.loaded;
  }

  getPromise() {
    return this.promise;
  }
}

export default Building;