import * as THREE from "three";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper.js";
class Lights {
    constructor(scene) {
        
/**
 * lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// light.position.set(0, 0, 10);

const directionalLight = new THREE.DirectionalLight(0xff9000,0.3);
directionalLight.position.set(1,0.25,0);

const hemisphereLight = new THREE.HemisphereLight(0xff0000,0x0000ff,0.3);

const pointLight = new THREE.PointLight(0xff9000,0.5);
pointLight.position.set(1,-0.5,1);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff,3,2,2); // width and height
rectAreaLight.position.set(-2.5,0,2.5);
rectAreaLight.lookAt(new THREE.Vector3());

const spotLight = new THREE.SpotLight(0x78ff00,0.5,10,Math.PI*0.1,0.25,1);//color , intensity,distance, angle , penumbra , decay  
spotLight.position.set(6,2,0);
spotLight.target.position.set(-3,-1,0);
scene.add(spotLight.target);



scene.add(ambientLight);
scene.add(directionalLight);
scene.add(hemisphereLight);
scene.add(pointLight);
scene.add(rectAreaLight);
scene.add(spotLight);

/**
 * Helper
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,0.1);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.1);
const pointLightHelper = new THREE.PointLightHelper(pointLight,0.1);
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight,0.1);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);

scene.add(hemisphereLightHelper);
scene.add(directionalLightHelper);
scene.add(pointLightHelper);
scene.add(rectAreaLightHelper);
scene.add(spotLightHelper);

// window.requestAnimationFrame(()=>
// {
//     rectAreaLightHelper.position.copy(rectAreaLight.position);
//     rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion);
//     rectAreaLightHelper.update();
// });


window.requestAnimationFrame(()=>
{

    spotLightHelper.update();
}
);



    }

    

}  
 export default Lights; 