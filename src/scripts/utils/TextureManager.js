import * as THREE from "three";

class TextureManager {
  constructor() {
    this.cache = new Map();
    this.loader = new THREE.TextureLoader();
  }

  async loadTexture(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    try {
      const texture = await new Promise((resolve, reject) => {
        this.loader.load(
          url,
          (texture) => {
            this.cache.set(url, texture);
            resolve(texture);
          },
          null,
          reject
        );
      });

      return texture;
    } catch (error) {
      console.error(`Failed to load texture ${url}:`, error);
      throw error;
    }
  }
}

export default TextureManager;