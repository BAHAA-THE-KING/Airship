import { GUI } from 'lil-gui';


function makeGui(timeController, physicalVariables, output) {

   const gui = new GUI();

   const timeControlFolder = gui.addFolder("Time Controls");
   timeControlFolder.add(timeController, "Morning");
   timeControlFolder.add(timeController, "Evning");
   timeControlFolder.add(timeController, "Night");

   const physicsFolder = gui.addFolder("Physics");
   physicsFolder.add(physicalVariables, 'start');

   const staticPhysicsFolder = physicsFolder.addFolder("Static");
   staticPhysicsFolder.add(physicalVariables, 'gravity').min(0).max(1000);
   staticPhysicsFolder.add(physicalVariables, 'loadMass').min(5400).max(5824);
   staticPhysicsFolder.add(physicalVariables, 'maxVolume').min(5300).max(5740);

   const drivePhysicsFolder = physicsFolder.addFolder("Drive");
   drivePhysicsFolder.add(physicalVariables, 'currentRPM').min(0).max(3000);
   drivePhysicsFolder.add(physicalVariables, 'airVolume').min(0).max(800);
   drivePhysicsFolder.add(physicalVariables, 'verticalRudder').min(-10).max(10).step(0.5);
   drivePhysicsFolder.add(physicalVariables, 'horizontalRudder').min(-10).max(10).step(0.5);

   const windPhysicsFolder = physicsFolder.addFolder("Wind");
   windPhysicsFolder.add(physicalVariables, 'windVelocity').min(0).max(30);
   windPhysicsFolder.add(physicalVariables.windDirection, 'x').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.windDirection, 'y').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.windDirection, 'z').min(-1).max(1);

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
   outgui.add(output, "Thrust").disable().domElement.classList.add("thrust");

   outgui.add(output, "WindX").disable().domElement.classList.add("wind");
   outgui.add(output, "WindY").disable().domElement.classList.add("wind");
   outgui.add(output, "WindZ").disable().domElement.classList.add("wind");

   outgui.add(output, "AccelerationX").disable().domElement.classList.add("acceleration");
   outgui.add(output, "AccelerationY").disable().domElement.classList.add("acceleration");
   outgui.add(output, "AccelerationZ").disable().domElement.classList.add("acceleration");
   outgui.add(output, "Acceleration").disable().domElement.classList.add("acceleration");

   outgui.add(output, "VelocityX").disable().domElement.classList.add("velocity");
   outgui.add(output, "VelocityY").disable().domElement.classList.add("velocity");
   outgui.add(output, "VelocityZ").disable().domElement.classList.add("velocity");
   outgui.add(output, "Velocity").disable().domElement.classList.add("velocity");

   outgui.add(output, "PositionX").disable().domElement.classList.add("position");
   outgui.add(output, "PositionY").disable().domElement.classList.add("position");
   outgui.add(output, "PositionZ").disable().domElement.classList.add("position");

   return outgui;
}

export default makeGui;