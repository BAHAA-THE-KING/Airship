import { GUI } from 'lil-gui';


function makeGui(timeController, cameraControl, physicalVariables, output, showCollision) {

   const gui = new GUI();

   const timeControlFolder = gui.addFolder("Time Controls");
   timeControlFolder.add(timeController, "Morning");
   timeControlFolder.add(timeController, "Evning");
   timeControlFolder.add(timeController, "Night");

   const cameraFolder = gui.addFolder("Camera");
   cameraFolder.add(cameraControl, "lookAtBlimp");
   cameraFolder.add(cameraControl, "autoLookAtBlimp");
   cameraFolder.add(cameraControl, "goToBlimp");
   cameraFolder.close();

   const physicsFolder = gui.addFolder("Physics");
   physicsFolder.add(physicalVariables, 'start');
   physicsFolder.add(physicalVariables, 'showCollision').onChange(showCollision);
   physicsFolder.add(physicalVariables, 'collide');

   const staticPhysicsFolder = physicsFolder.addFolder("Static");
   staticPhysicsFolder.add(physicalVariables, 'gravity').min(0).max(1000);
   staticPhysicsFolder.add(physicalVariables, 'loadMass').min(5400).max(5824);
   staticPhysicsFolder.add(physicalVariables, 'maxVolume').min(5300).max(5740);
   staticPhysicsFolder.add(physicalVariables, 'initialPressure').min(101300).max(1013000);
   staticPhysicsFolder.add(physicalVariables, 'initialTemperature').min(288.15).max(2881.5);
   staticPhysicsFolder.add(physicalVariables, 'airMolarMass').min(0).max(1);
   staticPhysicsFolder.add(physicalVariables, 'heliumMolarMass').min(0).max(1);
   staticPhysicsFolder.close();

   const drivePhysicsFolder = physicsFolder.addFolder("Drive");
   drivePhysicsFolder.add(physicalVariables, 'currentRPM').min(0).max(3000);
   drivePhysicsFolder.add(physicalVariables, 'airVolume').min(0).max(800);
   drivePhysicsFolder.add(physicalVariables, 'verticalRudder').min(-10).max(10).step(0.5);
   drivePhysicsFolder.add(physicalVariables, 'horizontalRudder').min(-10).max(10).step(0.5);
   drivePhysicsFolder.open();

   const windPhysicsFolder = physicsFolder.addFolder("Wind");
   windPhysicsFolder.add(physicalVariables, 'windVelocity').min(0).max(30);
   windPhysicsFolder.add(physicalVariables.windDirection, 'x').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.windDirection, 'y').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.windDirection, 'z').min(-1).max(1);
   windPhysicsFolder.close();

   physicsFolder.open();

   const outgui = new GUI({ title: "Output" });

   outgui.domElement.classList.add("output");

   //outgui.add(output, "WeightX").disable().domElement.classList.add("weight");
   outgui.add(output, "WeightY").disable().domElement.classList.add("weight");
   //outgui.add(output, "WeightZ").disable().domElement.classList.add("weight");

   //outgui.add(output, "BuoyancyX").disable().domElement.classList.add("buoyancy");
   outgui.add(output, "BuoyancyY").disable().domElement.classList.add("buoyancy");
   //outgui.add(output, "BuoyancyZ").disable().domElement.classList.add("buoyancy");

   outgui.add(output, "DragX").disable().domElement.classList.add("drag");
   outgui.add(output, "DragY").disable().domElement.classList.add("drag");
   outgui.add(output, "DragZ").disable().domElement.classList.add("drag");

   outgui.add(output, "ThrustX").disable().domElement.classList.add("thrust");
   outgui.add(output, "ThrustY").disable().domElement.classList.add("thrust");
   outgui.add(output, "ThrustZ").disable().domElement.classList.add("thrust");

   outgui.add(output, "WindX").disable().domElement.classList.add("wind");
   outgui.add(output, "WindY").disable().domElement.classList.add("wind");
   outgui.add(output, "WindZ").disable().domElement.classList.add("wind");

   outgui.add(output, "AccelerationX").disable().domElement.classList.add("acceleration");
   outgui.add(output, "AccelerationY").disable().domElement.classList.add("acceleration");
   outgui.add(output, "AccelerationZ").disable().domElement.classList.add("acceleration");

   outgui.add(output, "VelocityX").disable().domElement.classList.add("velocity");
   outgui.add(output, "VelocityY").disable().domElement.classList.add("velocity");
   outgui.add(output, "VelocityZ").disable().domElement.classList.add("velocity");

   outgui.add(output, "PositionX").disable().domElement.classList.add("position");
   outgui.add(output, "PositionY").disable().domElement.classList.add("position");
   outgui.add(output, "PositionZ").disable().domElement.classList.add("position");

   const driveoutgui = new GUI({ title: "driveOutput" });

   driveoutgui.domElement.classList.add("driveOutput");

   driveoutgui.add(output, "Thrust").disable().domElement.classList.add("thrust");
   driveoutgui.add(output, "Acceleration").disable().domElement.classList.add("acceleration");
   driveoutgui.add(output, "Velocity").disable().domElement.classList.add("velocity");
   driveoutgui.add(output, "Height").disable().domElement.classList.add("position");
   driveoutgui.add(output, "Pressure").disable().domElement.classList.add("pressure");
   driveoutgui.add(output, "Temperature").disable().domElement.classList.add("temperature");
   driveoutgui.add(output, "AirDensity").disable().domElement.classList.add("airDensity");
   driveoutgui.add(output, "HeliumDensity").disable().domElement.classList.add("heliumDensity");

   return { outgui, driveoutgui };
}

export default makeGui;