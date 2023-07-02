import * as THREE from "three";
import TextureManager from "../utils/TextureManager";

const textureManager = new TextureManager();

class Building {
  constructor(width, height, depth, sideTexturePath, topTexturePath) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.sideTexturePath = sideTexturePath;
    this.topTexturePath = topTexturePath;
    this.textureManager = textureManager;
    this.mesh = new THREE.Object3D();
    this.loaded = false;
    this.promise = this.load();
  }

  async load() {
    try {
      const [sideTexture, topTexture] = await Promise.all([
        this.textureManager.loadTexture(this.sideTexturePath),
        this.textureManager.loadTexture(this.topTexturePath)
      ]);

      const sideMaterial = new THREE.MeshStandardMaterial({ map: sideTexture });
      const topMaterial = new THREE.MeshStandardMaterial({ map: topTexture });
      const sideGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
      const topGeometry = new THREE.PlaneGeometry(this.width, this.depth);
      const sideMesh = new THREE.Mesh(sideGeometry, sideMaterial);
      const topMesh = new THREE.Mesh(topGeometry, topMaterial);

      topMesh.position.y = this.height / 2;
      topMesh.rotateX(-Math.PI / 2);

      this.mesh.add(sideMesh);
      this.mesh.add(topMesh);
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