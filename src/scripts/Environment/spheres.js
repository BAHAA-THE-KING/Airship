import * as THREE from 'three';

function makeSpheres(scene) {
   const widthSegments = 32;
   const heightSegments = 16;

   const radius = 800;
   const radius_building = 320;
   const radius_city = 800;
   const radius_football = 380;

   //// Moantains...
   const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
   //buildings 
   const sphere_buildings = new THREE.SphereGeometry(radius_building, widthSegments, heightSegments);
   // city
   const city = new THREE.SphereGeometry(radius_city, widthSegments, heightSegments);
   //football
   const football = new THREE.SphereGeometry(radius_football, widthSegments, heightSegments);

   const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); // Replace with your desired material

   const sphereMesh = new THREE.Mesh(sphereGeometry, material);
   const sphereMesh2 = new THREE.Mesh(sphereGeometry, material);
   const sphereMesh3 = new THREE.Mesh(sphereGeometry, material);
   const sphere_buildings1 = new THREE.Mesh(sphere_buildings, material);
   const sphere_buildings2 = new THREE.Mesh(sphere_buildings, material);
   const city_bulidings = new THREE.Mesh(city, material);
   const football_bulidings = new THREE.Mesh(football, material);
   // Moantains...
   sphereMesh.position.set(0, 300, 3200)
   sphereMesh.scale.set(6.2, 1, 1)


   sphereMesh2.position.set(3400, 300, 0)

   sphereMesh2.scale.set(6.8, 1, 1)
   sphereMesh2.rotateY(Math.PI / 2)


   sphereMesh3.position.set(-3400, 300, 0)
   sphereMesh3.scale.set(6.8, 1, 1)
   sphereMesh3.rotateY(Math.PI / 2)

   scene.add(sphereMesh);
   scene.add(sphereMesh2);
   scene.add(sphereMesh3);


   //small buildings 
   sphere_buildings1.position.set(0, 60, 1200)
   sphere_buildings1.scale.set(6, 1, 1)


   sphere_buildings2.position.set(0, 60, -1200)
   sphere_buildings2.scale.set(6, 1, 1)


   scene.add(sphere_buildings1);
   scene.add(sphere_buildings2);

   // city
   city_bulidings.position.set(-1400, -65, 0)
   city_bulidings.scale.set(1, 1, 1)

   scene.add(city_bulidings);

   //football
   football_bulidings.position.set(-300, -150, 230)

   scene.add(football_bulidings);
}

export default makeSpheres; 