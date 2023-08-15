import * as THREE from 'three';

function makeSpheres(scene) {
   let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); // Replace with your desired material

   //800, (0, 300, 3200), (6.2, 1, 1)
   let sphereGeometry = new THREE.SphereGeometry(800, 50, 50);
   let sphereMesh = new THREE.Mesh(sphereGeometry, material);
   sphereMesh.position.set(0, 300, 3200)
   sphereMesh.scale.set(6.2, 1, 1)

   //800, (3400, 300, 0), (1, 1, 6.8)
   sphereGeometry = new THREE.SphereGeometry(800, 50, 50);
   let sphereMesh2 = new THREE.Mesh(sphereGeometry, material);
   sphereMesh2.position.set(3400, 300, 0)
   sphereMesh2.scale.set(1, 1, 6.8)

   //800, (-3400, 300, 0), (1, 1, 6.8)
   sphereGeometry = new THREE.SphereGeometry(800, 50, 50);
   let sphereMesh3 = new THREE.Mesh(sphereGeometry, material);
   sphereMesh3.position.set(-3400, 300, 0)
   sphereMesh3.scale.set(1, 1, 6.8)

   //320, (0, 60, 1200), (6, 1, 1)
   let sphere_buildings = new THREE.SphereGeometry(320, 50, 50);
   let sphere_buildings1 = new THREE.Mesh(sphere_buildings, material);
   sphere_buildings1.position.set(0, 60, 1200)
   sphere_buildings1.scale.set(6, 1, 1)

   //320, (0, 60, -1200), (6, 1, 1)
   sphere_buildings = new THREE.SphereGeometry(320, 50, 50);
   let sphere_buildings2 = new THREE.Mesh(sphere_buildings, material);
   sphere_buildings2.position.set(0, 60, -1200)
   sphere_buildings2.scale.set(6, 1, 1)

   //800, (-1400, -65, 0), (1, 1, 1)
   let city = new THREE.SphereGeometry(800, 50, 50);
   let city_bulidings = new THREE.Mesh(city, material);
   city_bulidings.position.set(-1400, -65, 0)

   //380, (-300, -150, 230), (1, 1, 1)
   let football = new THREE.SphereGeometry(380, 50, 50);
   let football_bulidings = new THREE.Mesh(football, material);
   football_bulidings.position.set(-300, -150, 230)

   scene.add(sphereMesh);
   scene.add(sphereMesh2);
   scene.add(sphereMesh3);

   scene.add(sphere_buildings1);
   scene.add(sphere_buildings2);

   scene.add(city_bulidings);

   scene.add(football_bulidings);
}

export default makeSpheres; 