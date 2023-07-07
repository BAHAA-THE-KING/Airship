
import * as THREE from 'three';

export function createClouds(scene) {
  const textureLoader = new THREE.TextureLoader();
  const cloudTexture = textureLoader.load('textures/cloud1.png');

  const cloudMaterial = new THREE.PointsMaterial({
    size: 1000,
    map: cloudTexture,
    transparent: true,
    depthWrite: false,
    opacity : 0.6,
    // blending: THREE.AdditiveBlending
  });

  const cloudGeometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 4000 - 2000;
    const y = Math.random() * 2000 + 1000;
    const z = Math.random() * 4000 - 2000;
    // cloudMaterial.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

    positions.push(x, y, z);
  }

  cloudGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const cloudParticles = new THREE.Points(cloudGeometry, cloudMaterial);

  scene.add(cloudParticles);
  return cloudParticles;
}