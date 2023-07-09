
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
    const x = Math.random() * 4000 - 2000;
    const y = Math.random() * 2000 + 1000;
    const z = Math.random() * 4000 - 2000;

    positions.push(x, y, z);
   
   
  }

  cloudGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const cloudParticles = new THREE.Points(cloudGeometry, cloudMaterial);

  scene.add(cloudParticles);
  return cloudParticles;
}
