import { Box3 } from "three";
import ModelManager from "../utils/ModelManager";

class Blimp {
   isReady;
   leftRudder;
   rightRudder;
   bottomRudder;
   topRudder;
   leftFan;
   rightFan;
   constructor(scene) {
      this.isReady = false;
      ModelManager.loadModel("/models/good_year_blimp/good year blimp.gltf")
         .then((model) => {
            this.blimp = model.scene;
            this.blimp.scale.set(53 / 10, 53 / 10, 53 / 10);
            this.moveTo(600, 0, 200);
            this.blimp.rotation.order = "YXZ";
            scene.add(this.blimp);

            this.rightFan = model.scene.children[0].children[0].children[0].children[0].children.filter(e => e.name === "right_fan")[0];
            this.leftFan = model.scene.children[0].children[0].children[0].children[0].children.filter(e => e.name === "left_fan")[0];

            this.rightRudder = model.scene.children[0].children[0].children[0].children[0].children.filter(e => e.name === "right_rudder")[0];
            this.leftRudder = model.scene.children[0].children[0].children[0].children[0].children.filter(e => e.name === "left_rudder")[0];
            this.topRudder = model.scene.children[0].children[0].children[0].children[0].children.filter(e => e.name === "top_rudder")[0];
            this.bottomRudder = model.scene.children[0].children[0].children[0].children[0].children.filter(e => e.name === "bottom_rudder")[0];

            this.isReady = true;
         });
   }

   get position() {
      return this.blimp?.position;
   }

   get box() {
      if (this.blimp)
         return new Box3().setFromObject(this.blimp);
      return undefined;
   }

   move(dx, dy, dz) {
      this.blimp.position.x += dx;
      this.blimp.position.y += dy;
      this.blimp.position.z += dz;
   }

   moveTo(x, y, z) {
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

   rotateRudderTo(h, v) {
      this.rightRudder.rotation.y = h;
      this.leftRudder.rotation.y = h;

      this.topRudder.rotation.z = v;
      this.bottomRudder.rotation.z = v;
   }

   rotateFan(deg) {
      this.rightFan.rotateX(deg);
      this.leftFan.rotateX(deg);
   }
}

export default Blimp;