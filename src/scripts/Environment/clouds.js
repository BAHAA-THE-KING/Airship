
import * as THREE from 'three';

export function createClouds(scene,texture,number) {

  const cloudMaterial = new THREE.PointsMaterial({
    size: 1000,
    transparent: true,
    depthWrite: false,
    opacity: 0.6,
    map:texture, // Set initial map value to null
  });
  
  const cloudGeometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < number; i++) {
    const x = Math.random() * 10000 - 5000; // Adjust range to cover 10000 units
    const y = Math.random() * 3000 + 2000;  // Keep y range as per your requirement
    const z = Math.random() * 10000 - 5000; // Adjust range to cover 10000 units


    positions.push(x, y, z);
   
   
  }

  cloudGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const cloudParticles = new THREE.Points(cloudGeometry, cloudMaterial);

  scene.add(cloudParticles);
  return cloudParticles;
}
