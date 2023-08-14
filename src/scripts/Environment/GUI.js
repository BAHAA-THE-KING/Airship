import { GUI } from 'lil-gui';


function makeGui(waterUniforms, effectController, onChangeEffect, physicalVariables, timeChange, output) {

   const gui = new GUI();

   const skyboxFolder = gui.addFolder("Skybox");
   skyboxFolder.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'elevation', 0, 90, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'exposure', 0, 1, 0.0001).onChange(onChangeEffect);

   skyboxFolder.close();

   const timeControlFolder = gui.addFolder("Time Controls");
   const MorningControl = timeControlFolder.add(effectController, "Morning").name("Morning");
   const NightControl = timeControlFolder.add(effectController, "Night").name("Night");
   const EvningControl = timeControlFolder.add(effectController, "Evning").name("Evning");

   // Set up callbacks for each button
   MorningControl.onChange(function (value) {
      effectController.Morning = value;
      effectController.Night = false;
      effectController.Evning = false;
      MorningControl.updateDisplay();
      EvningControl.updateDisplay();
      NightControl.updateDisplay();
      timeChange();
   });

   NightControl.onChange(function (value) {
      effectController.Morning = false;
      effectController.Night = value;
      effectController.Evning = false;
      MorningControl.updateDisplay();
      EvningControl.updateDisplay();
      NightControl.updateDisplay();
      timeChange();
   });

   EvningControl.onChange(function (value) {
      effectController.Morning = false;
      effectController.Night = false;
      effectController.Evning = value;
      MorningControl.updateDisplay();
      EvningControl.updateDisplay();
      NightControl.updateDisplay();
      timeChange();
   });

   const waterFolder = gui.addFolder("Water");

   waterFolder.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
   waterFolder.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');
   waterFolder.close();
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