import * as THREE from "three";

function addLights(scene) {
    const ambientLight = new THREE.AmbientLight("gray", 0.1);

    const directionalLight = new THREE.DirectionalLight("gray", 0.01);


    directionalLight.position.set(0, 6000, -6000);

    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 1024 * 1024;
    directionalLight.shadow.mapSize.height = 1024 * 1024;

    directionalLight.shadow.camera.near = 100
    directionalLight.shadow.camera.far = 12000

    directionalLight.shadow.camera.top = 6000
    directionalLight.shadow.camera.right = 6000
    directionalLight.shadow.camera.bottom = - 6000
    directionalLight.shadow.camera.left = - 6000

    const platformLight1 = new THREE.PointLight(0xFF0000, 1);
    platformLight1.position.set(403, 50, 398);
    platformLight1.castShadow = true;

    const platformLight2 = new THREE.PointLight(0xFF0000, 1);
    platformLight2.position.set(795, 50, 6);
    platformLight2.castShadow = true;

    const platformLight3 = new THREE.PointLight(0xFF0000, 1);
    platformLight3.position.set(795, 50, 398);
    platformLight3.castShadow = true;

    const platformLight4 = new THREE.PointLight(0xFF0000, 1);
    platformLight4.position.set(403, 50, 6);
    platformLight4.castShadow = true;


    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(platformLight1);
    scene.add(platformLight2);
    scene.add(platformLight3);
    scene.add(platformLight4);

    //const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    //directionalLightCameraHelper.visible = true
    //scene.add(directionalLightCameraHelper)

    return { ambientLight, directionalLight, platformLight1, platformLight2, platformLight3, platformLight4 };
}

export default addLights; 