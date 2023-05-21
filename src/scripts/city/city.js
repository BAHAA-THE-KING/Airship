import * as THREE from "three";
import Building from "./building";
import Road from "./road";
import Street from "./streets";

export default function createCity(scene) {
  // Create buildings for the city
  const building1 = new Building(20, 30, 10, "/textures/city/apartments4.png");
  building1.setPosition(0, 10, -50);
  building1.addToScene(scene);
  
  const building2 = new Building(30, 20, 8, "/textures/city/photos_2017_7_9_fst_building-texture-windows.jpg");
  building2.setPosition(50, 10, 50);
  building2.addToScene(scene);

  const building3 = new Building(15, 30, 5, "/textures/city/apartments4.png");
  building3.setPosition(-50, 0, 50);
  building3.addToScene(scene);

  const building4 = new Building(10, 50, 12, "/textures/city/apartments4.png");
  building4.setPosition(50, 0, -50);
  building4.addToScene(scene);

  
/**
  
  // Create roads for the city
  const road1 = new Road(100, 10, 0x8080); // gray
  road1.setPosition(0, 0, -50);
  road1.addToScene(scene);

  const road2 =new Road(100, 10, 0x808080); // gray
  road2.setPosition(-50, 0, 0);
   road2.setRotation(0, 0, 0);
  road2.addToScene(scene);



  // Create streets for the city
  const street1 =new Street(1000, 10, 0x8080); // gray
  street1.setPosition(-50, 0, 0);
  street1.setRotation(0, Math.PI/2, 0);
  //street1.addToScene(scene);


*/








}