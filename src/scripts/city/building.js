import * as THREE from "three";
import MaterialManager from "../utils/MaterialManager";
import TextureManager from "../utils/TextureManager";

class Building {
  constructor(width, height, depth, sideTexturePath, topTexturePath) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.sideTexturePath = sideTexturePath;
    this.topTexturePath = topTexturePath;
    this.mesh = new THREE.Object3D();
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;

    this.loaded = false;
    this.promise = this.load();
  }

  async load() {
    try {
      let sideMaterial = MaterialManager.get(this.sideTexturePath);
      if (sideMaterial === false) {
        const texture = await TextureManager.loadTexture(this.sideTexturePath);
        sideMaterial = new THREE.MeshStandardMaterial({ map: texture });
        MaterialManager.save(this.sideTexturePath, sideMaterial);
      }

      let topMaterial = MaterialManager.get(this.topTexturePath);
      if (topMaterial === false) {
        const topTexture = await TextureManager.loadTexture(this.topTexturePath)
        topMaterial = new THREE.MeshStandardMaterial({ map: topTexture });
        MaterialManager.save(this.topTexturePath, topMaterial);
      }

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
      sideMesh.receiveShadow = true;
      sideMesh.castShadow = true;

      this.mesh.add(sideMesh);

      this.loaded = true;

      return this;

    } catch (error) {
      console.error(`Failed to create buidling : `, error);
      console.log(this.sideTexturePath);
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
