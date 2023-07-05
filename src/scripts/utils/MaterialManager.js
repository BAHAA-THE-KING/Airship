import * as THREE from "three";
import TextureManager from "./TextureManager";

const cache = new Map();

class MaterialManager {
  static save(id, material) {
    if (cache.has(id)) return false;
    cache.set(id, material);
    return true;
  }
  static get(id) {
    if (!cache.has(id)) return false;
    return cache.get(id);
  }
}

export default MaterialManager;