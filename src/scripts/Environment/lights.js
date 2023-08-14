import * as THREE from "three";

function addLights(scene) {
    const ambientLight = new THREE.AmbientLight("orange", 0.7);

    const directionalLight = new THREE.DirectionalLight("orange", 1);

    directionalLight.position.set(0, 3000, -6000);

    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 1024 * 1024;
    directionalLight.shadow.mapSize.height = 1024 * 1024;

    directionalLight.shadow.camera.near = 100
    directionalLight.shadow.camera.far = 12000

    directionalLight.shadow.camera.top = 6000
    directionalLight.shadow.camera.right = 6000
    directionalLight.shadow.camera.bottom = - 6000
    directionalLight.shadow.camera.left = - 6000

    scene.add(ambientLight);
    scene.add(directionalLight);

    //const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    //directionalLightCameraHelper.visible = true
    //scene.add(directionalLightCameraHelper)

    return { ambientLight, directionalLight };
}

export default addLights; 