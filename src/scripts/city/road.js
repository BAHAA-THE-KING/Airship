import * as THREE from "three";

export default class Road {
  constructor(length, width, texturePath) {
    this.length = length;
    this.width = width;
    this.texturePath = texturePath;

    // Create road surface
    this.surfaceTexture = new THREE.TextureLoader().load(texturePath);
    this.surfaceTexture.wrapS = THREE.RepeatWrapping; // set horizontal wrapping mode
    this.surfaceTexture.repeat.set(5, 1); // adjust repeat values as needed
    const surfaceGeometry = new THREE.BoxBufferGeometry(length, 0.01, width);
    const uvAttribute = surfaceGeometry.attributes.uv;
    for (let i = 0; i < uvAttribute.count; i++) {
      if (uvAttribute.getY(i) < 0.5) {
        uvAttribute.setY(i, 0);
      } else {
        uvAttribute.setY(i, 1);
      }
    }
    const surfaceMesh = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    this.surfaceMaterial = new THREE.MeshPhongMaterial({ map: this.surfaceTexture });
        // Create road lines
        this.lineGeometry = new THREE.BoxGeometry(length, 0.01, 0.1);
        this.lineMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        this.line1 = new THREE.Mesh(this.lineGeometry, this.lineMaterial);
        this.line2 = new THREE.Mesh(this.lineGeometry, this.lineMaterial);

        // Position and rotate road lines
        this.line1.position.set(0, 0.02, -width/4);
        this.line2.position.set(0, 0.02, width/4);
        this.line1.rotation.set(Math.PI/2, 0, 0);
        this.line2.rotation.set(Math.PI/2, 0, 0);

        // Create a group to hold the road surface and lines
        this.group = new THREE.Group();
        this.group.add(this.surfaceMesh);
        this.group.add(this.line1);
        this.group.add(this.line2);
      }

  setPosition(x, y, z) {
    this.group.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.group.rotation.set(x, y, z);
  }

  addToScene(scene) {
    scene.add(this.group)
  }
}