import { GUI } from 'lil-gui';

const gui = new GUI();

function makeGui(effectController, onChangeEffect, physicalVariables) {
   const skyboxFolder = gui.addFolder("Skybox");
   skyboxFolder.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'elevation', 0, 90, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'exposure', 0, 1, 0.0001).onChange(onChangeEffect);
   skyboxFolder.close();

   const physicsFolder = gui.addFolder("Physics");
   physicsFolder.add(physicalVariables, 'start');

   const staticPhysicsFolder = physicsFolder.addFolder("Static");
   staticPhysicsFolder.add(physicalVariables, 'gravity').min(0).max(1000);
   staticPhysicsFolder.add(physicalVariables, 'loadMass').min(5400).max(5824);
   staticPhysicsFolder.add(physicalVariables, 'maxVolume').min(5300).max(5740);

   const drivePhysicsFolder = physicsFolder.addFolder("Drive");
   drivePhysicsFolder.add(physicalVariables, 'currentRPM').min(0).max(2500);
   drivePhysicsFolder.add(physicalVariables, 'airVolume').min(0).max(800);
   drivePhysicsFolder.add(physicalVariables, 'verticalRudder').min(-10).max(10).step(0.5);
   drivePhysicsFolder.add(physicalVariables, 'horizontalRudder').min(-10).max(10).step(0.5);

   const windPhysicsFolder = physicsFolder.addFolder("Wind");
   windPhysicsFolder.add(physicalVariables, 'windVelocity').min(0).max(200);
   windPhysicsFolder.add(physicalVariables.windDirection, 'x').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.windDirection, 'y').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.windDirection, 'z').min(-1).max(1);

   physicsFolder.open();
}

export default makeGui;