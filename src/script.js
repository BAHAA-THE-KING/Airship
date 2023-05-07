import "./style.css";
import * as THREE from "three";

let width = window.innerWidth;
let height = window.innerHeight;

const can = document.querySelector("#can");

can.setAttribute("width", width);
can.setAttribute("height", height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 0, 5);

const scene = new THREE.Scene();

const renderer = new THREE.WebGL1Renderer({ canvas: can });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  can.setAttribute("width", width);
  can.setAttribute("height", height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();