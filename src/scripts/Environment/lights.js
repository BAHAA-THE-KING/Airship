import * as THREE from "three";

function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);//color , intensity,distance, angle , penumbra , decay  
    spotLight.position.set(6, 5, 0);
    spotLight.target.position.set(-3, -1, 0);
    scene.add(ambientLight);
    scene.add(spotLight.target);
    scene.add(spotLight);
}

export default addLights; 