import * as THREE from "three";
class Lights {
    constructor(scene) {
        /**
         * lights
         */
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);//color , intensity,distance, angle , penumbra , decay  
        this.spotLight.position.set(6, 5, 0);
        this.spotLight.target.position.set(-3, -1, 0);
        scene.add(this.ambientLight);
        scene.add(this.spotLight.target);
        scene.add(this.spotLight);
        /**
         * Helper
         */
        //this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
        //scene.add(this.spotLightHelper);
    }
}
export default Lights; 