import * as THREE from "three";
import MaterialManager from "../utils/MaterialManager";
import TextureManager from "../utils/TextureManager";

const surfaceTextureUrl = '/textures/city/asphalt.jpg';
const sideTextureUrl = '/textures/city/road.jpg';

export default class Road {
  constructor(length, width) {
    this.length = length;
    this.width = width;
    this.group = new THREE.Group();
    this.load();
  }
  async load() {
    // Create road surface
    let surfaceMaterial = MaterialManager.get(surfaceTextureUrl);
    if (surfaceMaterial === false) {
      const surfaceTexture = await TextureManager.loadTexture(surfaceTextureUrl);

      surfaceTexture.wrapS = THREE.RepeatWrapping; // set horizontal wrapping mode
      surfaceTexture.repeat.set(10, 1); // adjust repeat values as needed

      surfaceMaterial = new THREE.MeshStandardMaterial({ map: surfaceTexture });

      MaterialManager.save(surfaceTextureUrl, surfaceMaterial);
    }

    const surfaceGeometry = new THREE.BoxGeometry(this.length, 10, this.width);

    this.surfaceMesh = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

    this.surfaceMesh.receiveShadow = true;
    this.surfaceMesh.castShadow = true;

    const uvAttribute = surfaceGeometry.attributes.uv;
    for (let i = 0; i < uvAttribute.count; i++) {
      if (uvAttribute.getY(i) < 0.5)
        uvAttribute.setY(i, 0);
      else
        uvAttribute.setY(i, 1);
    }

    // Create road lines
    let lineMaterial = MaterialManager.get("Line Material");
    if (lineMaterial === false) {
      lineMaterial = new THREE.MeshStandardMaterial({ color: 0xa8680d });
      MaterialManager.save("Line Material", lineMaterial);
    }

    const lineGeometry = new THREE.BoxGeometry(this.length, 10, 0.22);

    this.line1 = new THREE.Mesh(lineGeometry, lineMaterial);
    this.line2 = new THREE.Mesh(lineGeometry, lineMaterial);

    // Position and rotate road lines
    this.line1.rotation.set(Math.PI * 2, 0, 0);
    this.line2.rotation.set(Math.PI * 2, 0, 0);
    this.line1.position.set(-0.9, 0.01, 1);
    this.line2.position.set(0.9, 0.01, -1);

    this.line1.receiveShadow = true;
    this.line1.castShadow = true;
    this.line2.receiveShadow = true;
    this.line2.castShadow = true;

    // Create sidewalks
    const sidewalkWidth = 25;

    // Create the geometry for the sidewalks
    const sidewalkGeometry = new THREE.PlaneGeometry(this.length, sidewalkWidth).rotateX(-Math.PI / 2);

    // Create the material for the sidewalks
    let sidewalkMaterial = MaterialManager.get(sideTextureUrl);

    if (sidewalkMaterial === false) {
      const sideTexture = await TextureManager.loadTexture(sideTextureUrl);

      sideTexture.wrapS = THREE.RepeatWrapping;
      sideTexture.repeat.set(70, 1.03);

      sidewalkMaterial = new THREE.MeshStandardMaterial({ map: sideTexture });

      MaterialManager.save(sideTextureUrl, sidewalkMaterial);
    }

    // Create a group to hold the sidewalks
    this.sidewalkGroup = new THREE.Group();

    this.sidewalkGroup.receiveShadow = true;
    this.sidewalkGroup.castShadow = true;

    // Create a mesh for the left sidewalk using the geometry and material
    const leftSidewalkMesh = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);

    // Position the left sidewalk mesh to the left of the road
    const leftSidewalkPosition = this.surfaceMesh.position.clone();
    leftSidewalkPosition.x -= 0; // Adjust the position in the x direction
    leftSidewalkPosition.z -= 50;
    leftSidewalkMesh.position.copy(leftSidewalkPosition);

    // Rotate the left sidewalk mesh
    leftSidewalkMesh.rotation.set(0, 0, 0);

    leftSidewalkMesh.receiveShadow = true;
    leftSidewalkMesh.castShadow = true;

    // Add the left sidewalk mesh to the sidewalk group
    this.sidewalkGroup.add(leftSidewalkMesh);

    // Create a mesh for the right sidewalk using the geometry and material
    const rightSidewalkMesh = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);

    // Position the right sidewalk mesh to the right of the road
    const rightSidewalkPosition = this.surfaceMesh.position.clone();
    rightSidewalkPosition.x += 0; // Adjust the position in the x direction
    rightSidewalkPosition.z += 50;
    rightSidewalkMesh.position.copy(rightSidewalkPosition);

    // Rotate the right sidewalk mesh
    rightSidewalkMesh.rotation.set(0, 0, 0);

    rightSidewalkMesh.receiveShadow = true;
    rightSidewalkMesh.castShadow = true;

    // Add the right sidewalk mesh to the sidewalk group
    this.sidewalkGroup.add(rightSidewalkMesh);

    // Create a group to hold the road surface, lines, and sidewalks
    this.group.add(this.surfaceMesh);
    this.group.add(this.line1);
    this.group.add(this.line2);
    this.group.add(this.sidewalkGroup);
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