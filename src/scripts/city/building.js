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
<<<<<<< HEAD
        this.loader.load(url, (texture) => {
          this.cache.set(url, texture);
          resolve(texture);
        }, null, reject);
=======
        this.loader.load(
          url,
          (texture) => {
            this.cache.set(url, texture);
            resolve(texture);
          },
          null,
          reject
        );
>>>>>>> 5ea5b3a3b02bb70f885c50c5290287d939897aee
      });
    }
  }
}
<<<<<<< HEAD

// Building class that uses TextureManager to load textures
export default class Building {
  constructor(width, height, depth, textureUrl, onLoad) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.texture = new THREE.TextureLoader().load(textureUrl, onLoad); // use the onLoad callback
    this.mesh = null; // initialize mesh to null

    
    // Load texture using TextureManager
    const textureManager = new TextureManager();
    textureManager.loadTexture(textureUrl).then((texture) => {
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
    }).catch((err) => {
      console.error(`Failed to load texture: ${textureUrl}`, err);
=======
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
>>>>>>> 5ea5b3a3b02bb70f885c50c5290287d939897aee
    });

    this.promise = promise;
  }
  
  setPosition(x, y, z) {
<<<<<<< HEAD
    if (!this.mesh) {
      console.error("Cannot set position before mesh is created");
      return;
    }
    
    this.mesh.position.set(x, y, z);
=======
    if (this.mesh) {
      this.mesh.position.set(x, y, z);
    }
>>>>>>> 5ea5b3a3b02bb70f885c50c5290287d939897aee
  }
  
  addToScene(scene) {
<<<<<<< HEAD
    if (!this.mesh) {
      console.error("Cannot add to scene before mesh is created");
      return;
    }
    
    scene.add(this.mesh);
=======
    if (this.mesh) {
      scene.add(this.mesh);
    }
>>>>>>> 5ea5b3a3b02bb70f885c50c5290287d939897aee
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