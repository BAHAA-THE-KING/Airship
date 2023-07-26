import { Vector3 } from "three";
import ModelManager from "../utils/ModelManager";

class Blimp {
   constructor(scene) {
      this.isReady = false;
      ModelManager.loadModel("/models/good_year_blimp/good year blimp.gltf")
         .then((model) => {
            this.blimp = model.scene;
            this.blimp.scale.set(53 / 10, 53 / 10, 53 / 10);
            this.move(600, 0, 200);
            console.log(model);
            scene.add(this.blimp);

            this.isReady = true;
         });
   }

   get position() {
      return this.blimp.position;
   }

   move(dx, dy, dz) {
      if (dx instanceof Vector3) {
         this.blimp.position.x += dx.x;
         this.blimp.position.y += dx.y;
         this.blimp.position.z += dx.z;
         return;
      }
      this.blimp.position.x += dx;
      this.blimp.position.y += dy;
      this.blimp.position.z += dz;
   }

   moveTo(x, y, z) {
      if (x instanceof Vector3) {
         this.blimp.position.x = x.x;
         this.blimp.position.y = x.y;
         this.blimp.position.z = x.z;
         return;
      }
      this.blimp.position.x = x;
      this.blimp.position.y = y;
      this.blimp.position.z = z;
   }

   rotate(dx, dy, dz) {
      this.blimp.rotation.x += dx;
      this.blimp.rotation.y += dy;
      this.blimp.rotation.z += dz;
   }

   rotateTo(x, y, z) {
      this.blimp.rotation.x = x;
      this.blimp.rotation.y = y;
      this.blimp.rotation.z = z;
   }
}

export default Blimp;