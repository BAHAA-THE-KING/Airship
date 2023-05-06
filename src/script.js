import "./style.css";
import * as THREE from "three";

let width=window.innerWidth;
let height=window.innerHeight;

const can=document.querySelector("#can");

can.setAttribute("width",width);
can.setAttribute("height",height);

const camera=new THREE.PerspectiveCamera(45,width/height,0.1,1000);

const scene=new THREE.Scene();

const renderer=new THREE.WebGL1Renderer({canvas:can});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
renderer.render(scene,camera);

window.onresize=function(){
                           width=window.innerWidth;
                           height=window.innerHeight;
                           can.setAttribute("width",width);
                           can.setAttribute("height",height);

                           camera.aspect=width/height;
                           camera.updateProjectionMatrix();

                           renderer.setSize(width,height);
                           renderer.setPixelRatio(window.devicePixelRatio);
                           };

//Code



//END Code

const clock = new THREE.Clock();
let oldElapsedTime=0;
function animate(){
        const elapsedTime=clock.getElapsedTime();
        const deltaTime=elapsedTime-oldElapsedTime;
        oldElapsedTime=elapsedTime;
        
        renderer.render(scene,camera);
        
        requestAnimationFrame(animate);
        }
animate();