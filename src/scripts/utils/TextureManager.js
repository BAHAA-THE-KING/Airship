import * as THREE from "three";

const cache = new Map();
const loader = new THREE.TextureLoader();

class TextureManager {
  static loadTexture(url) {
    if (cache.has(url)) {
      return cache.get(url);
    }

    try {
      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (texture) => {
            cache.set(url, texture);
            resolve(texture);
          },
          null,
          reject
        );
      });
    } catch (error) {
      console.error(`Failed to load texture ${url}:`, error);
      throw error;
    }
  }
}

export default TextureManager;