import * as THREE from "three";

// TextureManager class to load and cache textures
class TextureManager {
  constructor() {
    this.cache = new Map();
    this.loader = new THREE.TextureLoader();
  }

  loadTexture(url) {
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url));
    } else {
      return new Promise((resolve, reject) => {
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
    }
  }
}

// Building class that uses TextureManager to load textures
export default class Building {
  constructor(width, height, depth, textureUrl) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.textureUrl = textureUrl;
    this.textureManager = new TextureManager();
    this.mesh = null;
    this.texture = null;
    this.loaded = false;

    const promise = this.textureManager.loadTexture(textureUrl).then((texture) => {
      this.texture = texture;
      const materialWithTexture = new THREE.MeshPhongMaterial({ map: texture });
      const materialWithoutTexture = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const geometry = new THREE.BoxGeometry(width, height, depth);
      this.mesh = new THREE.Mesh(geometry, [materialWithTexture, materialWithTexture, materialWithTexture, materialWithTexture, materialWithoutTexture, materialWithoutTexture]);
      this.loaded = true;
      return this;
    }).catch((error) => {
      console.error(`Failed to load texture ${textureUrl}:`, error);
    });

    this.promise = promise;
  }

  setPosition(x, y, z) {
    if (this.mesh) {
      this.mesh.position.set(x, y, z);
    }
  }

  addToScene(scene) {
    if (this.mesh) {
      scene.add(this.mesh);
    }
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

  load() {
    if (this.loaded) {
      return Promise.resolve(this);
    } else {
      return this.promise.then(() => {
        return this;
      });
    }
  }
}