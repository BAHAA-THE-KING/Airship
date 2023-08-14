import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function addOrbitControls(camera, renderer) {
  const minAllowedY = 3;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // Set constraints to keep the camera within the skybox boundaries
  const halfSkyboxSize = 12000 * 0.5;
  controls.minDistance = halfSkyboxSize / 35; // Minimum distance from the target
  controls.maxDistance = halfSkyboxSize; // Maximum distance from the target
  controls.maxPolarAngle = Math.PI / 2; // Limit the angle of inclination (no looking directly up or down)
  // Limit the minimum y-coordinate (elevation) for the camera
  let cameraAdjusting = false;

  controls.addEventListener('change', () => {
    if (!cameraAdjusting) {
      const currentPosition = camera.position.clone();
      if (currentPosition.y < minAllowedY) {
        cameraAdjusting = true;
        currentPosition.setY(minAllowedY);
        camera.position.copy(currentPosition);
        cameraAdjusting = false;
      }
    }
  });
  return controls;
}

export default addOrbitControls;