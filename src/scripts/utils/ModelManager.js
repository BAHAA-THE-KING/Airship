import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const cache = new Map();
const loader = new GLTFLoader();

function traverse(obj) {
   if (!obj?.children?.length) return;
   for (const n of obj.children) {
      n.receiveShadow = true;
      n.castShadow = true;
      traverse(n);
   }
}

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
                  gltf.scene.receiveShadow = true;
                  gltf.scene.castShadow = true;
                  traverse(gltf.scene);
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