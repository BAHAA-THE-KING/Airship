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
let textureManager1 = new TextureManager();
// Building class that uses TextureManager to load textures
export default class Building {
  constructor(width, height, depth, textureUrl) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.textureUrl = textureUrl;
    this.textureManager = textureManager1;
    this.mesh = null;
    this.texture = null;
    this.loaded = false;

    const promise = this.textureManager.loadTexture(textureUrl).then((texture) => {
      this.texture = texture;
      const materialWithTexture = new THREE.MeshStandardMaterial({ map: texture });
      const materialWithoutTexture = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });

      const materials = [
        materialWithoutTexture, // right
        materialWithoutTexture, // left
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // top
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // bottom
        materialWithTexture, // front
        materialWithTexture, // back
      ];

      const faceIndices = [4, 5, 0, 1]; // right, left, top, bottom
      for (let i = 0; i < faceIndices.length; i++) {
        const materialIndex = faceIndices[i];
        materials[materialIndex] = materialWithTexture;
      }

      const geometry = new THREE.BoxGeometry(width, height, depth);
      this.mesh = new THREE.Mesh(geometry, materials);
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