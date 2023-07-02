import * as THREE from "three";
import TextureManager from "./TextureManager";

const textureManager = new TextureManager();

class MaterialManager {
  constructor() {
    this.cache = new Map();
  }

  async getMaterial(url) {
    if (!this.cache.has(url)) {
      const tex = await textureManager.loadTexture(url);
      this.cache.set(url, new THREE.MeshStandardMaterial({ map: tex }));
    }
    return this.cache.get(url);
  }
}

export default MaterialManager;