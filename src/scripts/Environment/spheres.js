import * as THREE from 'three';

const collisions = [
   { radius: 800, posX: 0, posY: 300, posZ: 3200, scaleX: 6.2, scaleY: 1, scaleZ: 1 },
   { radius: 800, posX: 3400, posY: 300, posZ: 0, scaleX: 1, scaleY: 1, scaleZ: 6.8 },
   { radius: 800, posX: -3400, posY: 300, posZ: 0, scaleX: 1, scaleY: 1, scaleZ: 6.8 },
   { radius: 320, posX: 0, posY: 60, posZ: 1200, scaleX: 6, scaleY: 1, scaleZ: 1 },
   { radius: 320, posX: 0, posY: 60, posZ: -1200, scaleX: 6, scaleY: 1, scaleZ: 1 },
   { radius: 800, posX: -1400, posY: -65, posZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
   { radius: 380, posX: -300, posY: -150, posZ: 230, scaleX: 1, scaleY: 1, scaleZ: 1 }
];

function makeSpheres() {
   let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

   //800, (0, 300, 3200), (6.2, 1, 1)
   let sphereGeometry = new THREE.SphereGeometry(800, 32, 16);
   let sphereMesh = new THREE.Mesh(sphereGeometry, material);
   sphereMesh.position.set(0, 300, 3200)
   sphereMesh.scale.set(6.2, 1, 1)

   //800, (3400, 300, 0), (1, 1, 6.8)
   sphereGeometry = new THREE.SphereGeometry(800, 32, 16);
   let sphereMesh2 = new THREE.Mesh(sphereGeometry, material);
   sphereMesh2.position.set(3400, 300, 0)
   sphereMesh2.scale.set(1, 1, 6.8)

   //800, (-3400, 300, 0), (1, 1, 6.8)
   sphereGeometry = new THREE.SphereGeometry(800, 32, 16);
   let sphereMesh3 = new THREE.Mesh(sphereGeometry, material);
   sphereMesh3.position.set(-3400, 300, 0)
   sphereMesh3.scale.set(1, 1, 6.8)

   //320, (0, 60, 1200), (6, 1, 1)
   let sphere_buildings = new THREE.SphereGeometry(320, 32, 16);
   let sphere_buildings1 = new THREE.Mesh(sphere_buildings, material);
   sphere_buildings1.position.set(0, 60, 1200)
   sphere_buildings1.scale.set(6, 1, 1)

   //320, (0, 60, -1200), (6, 1, 1)
   sphere_buildings = new THREE.SphereGeometry(320, 32, 16);
   let sphere_buildings2 = new THREE.Mesh(sphere_buildings, material);
   sphere_buildings2.position.set(0, 60, -1200)
   sphere_buildings2.scale.set(6, 1, 1)

   //800, (-1400, -65, 0), (1, 1, 1)
   let city = new THREE.SphereGeometry(800, 32, 16);
   let city_bulidings = new THREE.Mesh(city, material);
   city_bulidings.position.set(-1400, -65, 0)

   //380, (-300, -150, 230), (1, 1, 1)
   let football = new THREE.SphereGeometry(380, 32, 16);
   let football_bulidings = new THREE.Mesh(football, material);
   football_bulidings.position.set(-300, -150, 230)

   return [sphereMesh, sphereMesh2, sphereMesh3, sphere_buildings1, sphere_buildings2, city_bulidings, football_bulidings];
}

export { makeSpheres };
export { collisions };