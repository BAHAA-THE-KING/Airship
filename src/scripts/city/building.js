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
        this.loader.load(url, (texture) => {
          this.cache.set(url, texture); // cache the texture
          resolve(texture);
        }, undefined, (error) => {
          reject(error);
        });
      });
    }
  }
}

// Building class that uses TextureManager to load textures
export default class Building {
  constructor(width, height, depth, textureUrl, onLoad) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.loaded = false;
    this.promise = null;
    this.geometry = null;
    this.mesh = null;

    // Load texture using TextureManager
    const textureManager = new TextureManager();
    this.promise = textureManager.loadTexture(textureUrl).then((texture) => {
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
      this.loaded = true;
      if (onLoad) {
        onLoad();
      }
    }).catch((err) => {
      console.error(`Failed to load texture: ${textureUrl}`, err);
    });
  }

  setPosition(x, y, z) {
    if (!this.mesh) {
      console.error("Cannot set position before mesh is created");
      return;
    }
    this.mesh.position.set(x, y, z);
  }

  addToScene(scene) {
    if (!this.mesh) {
      console.error("Cannot add to scene before mesh is created");
      return;
    }
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