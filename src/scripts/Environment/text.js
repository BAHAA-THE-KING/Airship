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

        const textGeometry3 = new TextGeometry('Abdulrahman Khazoum', {
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

        const textGeometry4 = new TextGeometry('Abdulla Musa', {
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
        const textGeometry5 = new TextGeometry('Abdullah Rahmoun', {
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
        const textGeometry6 = new TextGeometry('Alaa Shibany', {
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
        const textGeometry7 = new TextGeometry('Mohmoud ElKhayat', {
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

        textMesh.rotateY(Math.PI / 2);
        textMesh.rotateY(-Math.PI / 6);

        textMesh2.rotateY(Math.PI / 2);
        textMesh2.rotateY(-Math.PI / 6);

        textMesh3.rotateY(Math.PI / 2);
        textMesh3.rotateY(-Math.PI / 6);

        textMesh4.rotateY(Math.PI / 2);
        textMesh4.rotateY(-Math.PI / 6);

        textMesh5.rotateY(Math.PI / 2);
        textMesh5.rotateY(-Math.PI / 6);

        textMesh6.rotateY(Math.PI / 2);
        textMesh6.rotateY(-Math.PI / 6);


        textMesh7.rotateY(Math.PI / 2);
        textMesh7.rotateY(-Math.PI / 6);




        textMesh.position.set(0, 30, -100); // Adjust the position
        textMesh2.position.set(90, 10, -110); // Adjust the position
        textMesh3.position.set(220, 10, -340); // Adjust the position
        textMesh4.position.set(230, 10, -110); // Adjust the position
        textMesh5.position.set(360, 10, -340); // Adjust the position
        textMesh6.position.set(350, 10, -110); // Adjust the position
        textMesh7.position.set(480, 10, -340); // Adjust the position

        scene.add(textMesh);
        scene.add(textMesh2);
        scene.add(textMesh3);
        scene.add(textMesh4);
        scene.add(textMesh5);
        scene.add(textMesh6);
        scene.add(textMesh7);
    }
}

export default makeText;
