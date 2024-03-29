import * as THREE from 'three';
// import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

function makeMountain(scene) {
  const textureLoader = new THREE.TextureLoader();
  const worldWidth = 256, worldDepth = 256


  const tt = textureLoader.load(`textures/mountain/Mountain.png`);
  // const HeightMap = textureLoader.load(`textures/mountain/HeightMap3.png`);
  const HeightMap2 = textureLoader.load(`textures/mountain/HeightMap8.png`);
  // const HeightMap2 = textureLoader.load(`textures/mountain/HeightMap7.jpg`);

  // const material = new THREE.MeshPhongMaterial({
  //     map: tt,               // Your texture
  //     displacementMap: HeightMap,
  //     // displacementScale: 500,     // Adjust the scale as needed
  //     displacementScale: 1500,     // 3
  //     // depthTest: false, //
  //   });
  const material2 = new THREE.MeshPhongMaterial({
    map: tt,               // Your texture
    displacementMap: HeightMap2,
    // displacementScale: 500,     // Adjust the scale as needed
    displacementScale: 1500,     // 3
    // depthTest: false, //
  });
  const geometry = new THREE.PlaneGeometry(2500, 2500, worldWidth - 1, worldDepth - 1);
  geometry.rotateX(-Math.PI / 2);
  geometry.rotateY(-Math.PI);

  // const mesh = new THREE.Mesh(geometry, material);
  // const mesh2 = new THREE.Mesh(geometry, material);
  const mesh3 = new THREE.Mesh(geometry, material2);
  const mesh4 = new THREE.Mesh(geometry, material2);
  const mesh5 = new THREE.Mesh(geometry, material2);
  const mesh6 = new THREE.Mesh(geometry, material2);
  // mesh.position.set(3000,-400,-200);
  // mesh2.position.set(-3400,-400,-200);

  mesh3.scale.set(4, 1, 1)
  mesh4.scale.set(4, 1, 1)
  mesh5.scale.set(4, 1, 1)
  mesh6.scale.set(4, 1, 1)

  mesh4.rotateY(Math.PI)
  mesh5.rotateY(Math.PI / 2)
  mesh6.rotateY(-Math.PI / 2)

  mesh3.position.set(0, -400, 3500);
  mesh4.position.set(0, -400, -3500);
  mesh5.position.set(3700, -400, -200);
  mesh6.position.set(-3700, -400, -200);

  mesh3.receiveShadow = true;
  mesh3.castShadow = true;
  mesh4.receiveShadow = true;
  mesh4.castShadow = true;
  mesh5.receiveShadow = true;
  mesh5.castShadow = true;
  mesh6.receiveShadow = true;
  mesh6.castShadow = true;

  // scene.add(mesh);
  // scene.add(mesh2);
  scene.add(mesh3);
  // scene.add(mesh4);
  scene.add(mesh5);
  scene.add(mesh6);


  // const data = generateHeight( worldWidth, worldDepth );


  // const worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

  // const geometry2 = new THREE.PlaneGeometry( 2500, 2500, worldWidth - 1, worldDepth - 1 );
  // geometry2.rotateX( - Math.PI / 2 );

  // const vertices = geometry2.attributes.position.array;

  // for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

  //     vertices[ j + 1 ] = data[ i ] * 10;

  // }

  // //

  // let texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
  // texture.wrapS = THREE.ClampToEdgeWrapping;
  // texture.wrapT = THREE.ClampToEdgeWrapping;
  // texture.colorSpace = THREE.SRGBColorSpace;

  // const mesh3 = new THREE.Mesh( geometry2, new THREE.MeshBasicMaterial( { map: texture } ) );
  // const mesh4 = new THREE.Mesh( geometry2, new THREE.MeshBasicMaterial( { map: texture } ) );
  // mesh3.position.set(0,-1000,3500);
  // mesh4.position.set(0,-1000,-3500);
  // scene.add( mesh3 );
  // scene.add( mesh4 );





}
// function generateHeight( width, height ) {

//     const size = width * height, data = new Uint8Array( size ),
//         perlin = new ImprovedNoise(), z = Math.random() * 100;

//     let quality = 1;

//     for ( let j = 0; j < 4; j ++ ) {

//         for ( let i = 0; i < size; i ++ ) {

//             const x = i % width, y = ~ ~ ( i / width );
//             data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

//         }

//         quality *= 5;

//     }

//     return data;

// }

// function generateTexture( data, width, height ) {

//     // bake lighting into texture

//     let context, image, imageData, shade;

//     const vector3 = new THREE.Vector3( 0, 0, 0 );

//     const sun = new THREE.Vector3( 1, 1, 1 );
//     sun.normalize();

//     const canvas = document.createElement( 'canvas' );
//     canvas.width = width;
//     canvas.height = height;

//     context = canvas.getContext( '2d' );
//     context.fillStyle = '#000';
//     context.fillRect( 0, 0, width, height );

//     image = context.getImageData( 0, 0, canvas.width, canvas.height );
//     imageData = image.data;

//     for ( let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

//         vector3.x = data[ j - 2 ] - data[ j + 2 ];
//         vector3.y = 2;
//         vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
//         vector3.normalize();

//         shade = vector3.dot( sun );

//         imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
//         imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
//         imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );

//     }

//     context.putImageData( image, 0, 0 );

//     // Scaled 4x

//     const canvasScaled = document.createElement( 'canvas' );
//     canvasScaled.width = width * 4;
//     canvasScaled.height = height * 4;

//     context = canvasScaled.getContext( '2d' );
//     context.scale( 4, 4 );
//     context.drawImage( canvas, 0, 0 );

//     image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
//     imageData = image.data;

//     for ( let i = 0, l = imageData.length; i < l; i += 4 ) {

//         const v = ~ ~ ( Math.random() * 5 );

//         imageData[ i ] += v;
//         imageData[ i + 1 ] += v;
//         imageData[ i + 2 ] += v;

//     }

//     context.putImageData( image, 0, 0 );

//     return canvasScaled;

// }


export default makeMountain; 