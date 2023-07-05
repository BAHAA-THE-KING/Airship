import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const cache = new Map();
const loader = new GLTFLoader();

class ModelManager {
   static loadModel(url) {
      if (cache.has(url)) {
         return cache.get(url);
      }

      try {
         return new Promise((resolve, reject) => {
            loader.load(
               url,
               (gltf) => {
                  cache.set(url, gltf);
                  resolve(gltf);
               },
               null,
               reject
            );
         });
      } catch (error) {
         console.error(`Failed to load model ${url}:`, error);
         throw error;
      }
   }
}

export default ModelManager;