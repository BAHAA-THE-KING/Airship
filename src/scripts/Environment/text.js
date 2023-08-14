import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import TextureManager from '../utils/TextureManager';

function makeText(scene) {

    const fontLoader = new FontLoader();
    let font;

    fontLoader.load('fonts/helvetiker_regular.typeface.json', function (loadedFont) {
        font = loadedFont;
        createText();
    });

    async function createText() {
        const textGeometry = new TextGeometry('Blimp Wever Team!', {
            font: font,
            size: 50,
            height: 10, // Increase depth
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 2, // Increase bevel depth
            bevelSize: 1, // Increase bevel size
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textGeometry2 = new TextGeometry('Bahaa Eddin AL-Nokta', {
            font: font,
            size: 20,
            height: 10, // Increase depth
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1, // Increase bevel depth
            bevelSize: 1, // Increase bevel size
            bevelOffset: 0,
            bevelSegments: 5
        });

        const textGeometry3 = new TextGeometry('Mohmoud ElKhayat', {
            font: font,
            size: 20,
            height: 10, // Increase depth
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1, // Increase bevel depth
            bevelSize: 1, // Increase bevel size
            bevelOffset: 0,
            bevelSegments: 5
        });

        const textGeometry4 = new TextGeometry('Abdullah Rahmoun', {
            font: font,
            size: 20,
            height: 10, // Increase depth
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1, // Increase bevel depth
            bevelSize: 1, // Increase bevel size
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textGeometry5 = new TextGeometry('Alaa Shibany', {
            font: font,
            size: 20,
            height: 10, // Increase depth
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1, // Increase bevel depth
            bevelSize: 1, // Increase bevel size
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textGeometry6 = new TextGeometry('Abdulla Musa', {
            font: font,
            size: 20,
            height: 10, // Increase depth
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1, // Increase bevel depth
            bevelSize: 1, // Increase bevel size
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textGeometry7 = new TextGeometry('Abdulrahman Khazoum', {
            font: font,
            size: 20,
            height: 10, // Increase depth
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1, // Increase bevel depth
            bevelSize: 1, // Increase bevel size
            bevelOffset: 0,
            bevelSegments: 5
        });

        let textMaterial = new THREE.MeshMatcapMaterial();

        textMaterial.matcap = await TextureManager.loadTexture("/textures/matcaps/3.png");
        // Create a gradient material with multiple colors

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
        const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial);
        const textMesh4 = new THREE.Mesh(textGeometry4, textMaterial);
        const textMesh5 = new THREE.Mesh(textGeometry5, textMaterial);
        const textMesh6 = new THREE.Mesh(textGeometry6, textMaterial);
        const textMesh7 = new THREE.Mesh(textGeometry7, textMaterial);

        textMesh.receiveShadow = true;
        textMesh.castShadow = true;
        textMesh2.receiveShadow = true;
        textMesh2.castShadow = true;
        textMesh3.receiveShadow = true;
        textMesh3.castShadow = true;
        textMesh4.receiveShadow = true;
        textMesh4.castShadow = true;
        textMesh5.receiveShadow = true;
        textMesh5.castShadow = true;
        textMesh6.receiveShadow = true;
        textMesh6.castShadow = true;
        textMesh7.receiveShadow = true;
        textMesh7.castShadow = true;


        const group = new THREE.Group();
        const group1 = new THREE.Group();
        const group2 = new THREE.Group();
        const group3 = new THREE.Group();
        const MainGroup = new THREE.Group();

        textMesh.rotateY(Math.PI / 2);
        textMesh.rotateY(-Math.PI / 3);

        textMesh2.rotateY(Math.PI / 2);
        textMesh2.rotateY(-Math.PI / 3);

        textMesh3.rotateY(Math.PI / 2);
        textMesh3.rotateY(-Math.PI / 3);

        textMesh4.rotateY(Math.PI / 2);
        textMesh4.rotateY(-Math.PI / 3);

        textMesh5.rotateY(Math.PI / 2);
        textMesh5.rotateY(-Math.PI / 3);

        textMesh6.rotateY(Math.PI / 2);
        textMesh6.rotateY(-Math.PI / 3);


        textMesh7.rotateY(Math.PI / 2);
        textMesh7.rotateY(-Math.PI / 3);

        // const axisHelper = new THREE.AxesHelper(5); // 5 is the size of the axis lines

        // Add the axis helper to the group



        textMesh.position.set(0, 30, -100); // Adjust the position
        group.add(textMesh);
        group.position.x += -80;
        group.position.y += 0;
        group.position.z += -350;


        textMesh2.position.set(50, 10, -80); // Adjust the position

        textMesh3.position.set(400, 10, -290); // Adjust the position//
        group1.add(textMesh2);
        group1.add(textMesh3);
        group1.position.x += -110;
        group1.position.y += 0;
        group1.position.z += -250;

        textMesh4.position.set(200, 10, -50); // Adjust the position
        textMesh4.translateX(-70);
        textMesh5.position.set(460, 10, -200); // Adjust the position//

        group2.add(textMesh4);
        group2.add(textMesh5);
        group2.position.x += -80;
        group2.position.y += 0;
        group2.position.z += -200;


        textMesh6.position.set(205, 10, 30); // Adjust the position

        textMesh7.position.set(490, 10, -140); // Adjust the position//
        group3.add(textMesh6);
        group3.add(textMesh7);
        group3.position.x += -40;
        group3.position.y += 0;
        group3.position.z += -150;


        MainGroup.add(group);
        MainGroup.add(group1);
        MainGroup.add(group2);
        MainGroup.add(group3);

        // group3.position.set(group3.position.z + 250)
        // scene.add(group);   
        // scene.add(group1);
        // scene.add(group2);
        // scene.add(group3);
        scene.add(MainGroup);
        // scene.add(textMesh);
        // scene.add(textMesh2);
        // scene.add(textMesh3);
        // scene.add(textMesh4);
        // scene.add(textMesh5);
        // scene.add(textMesh6);
        // scene.add(textMesh7);
    }
}

export default makeText;
