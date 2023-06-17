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
          this.cache.set(url, texture);
          resolve(texture);
        }, null, reject);
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
    this.texture = null;
    this.mesh = null;

    // Load texture using TextureManager
    const textureManager = new TextureManager();
    textureManager.loadTexture(textureUrl)
      .then((texture) => {
        this.texture = texture;
        this.createMesh();
        if (onLoad) {
          onLoad(this.mesh);
        }
      })
      .catch((err) => {
        console.error(`Failed to load texture: ${textureUrl}`, err);
      });
  }

  createMesh() {
    if (!this.texture) {
      console.error("Cannot create mesh without texture");
      return;
    }

    // Create material with texture for the sides
    const sideMaterial = new THREE.MeshPhongMaterial({ map: this.texture });

    // Create material without texture for the top and bottom
    const topBottomMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

    // Create geometry and assign materials to faces
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth, 1, 1, 1);
    geometry.faces.forEach((face) => {
      if (face.normal.y === 1) {
        face.materialIndex = 1; // top face
      } else if (face.normal.y === -1) {
        face.materialIndex = 2; // bottom face
      } else {
        face.materialIndex = 0; // side faces
      }
    });

    // Set material indices for each face
    geometry.groupsNeedUpdate = true;
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    // Create mesh with geometry and materials
    this.mesh = new THREE.Mesh(geometry, [sideMaterial, topBottomMaterial, topBottomMaterial]);
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
}