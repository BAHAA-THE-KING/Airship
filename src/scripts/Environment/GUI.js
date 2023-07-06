import { GUI } from 'lil-gui';

const gui = new GUI();

function makeGui(effectController, onChangeEffect, physicalVariables) {
   const skyboxFolder = gui.addFolder("Skybox");
   const physicsFolder = gui.addFolder("Physics");

   skyboxFolder.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'elevation', 0, 90, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'exposure', 0, 1, 0.0001).onChange(onChangeEffect);
   skyboxFolder.close();

   const staticPhysicsFolder = physicsFolder.addFolder("Static");
   staticPhysicsFolder.add(physicalVariables, 'gravity').min(0).max(1000);
   staticPhysicsFolder.add(physicalVariables, 'heliumVolume').min(3600).max(5630);
   staticPhysicsFolder.add(physicalVariables, 'loadMass').min(4000).max(6400);

   const drivePhysicsFolder = physicsFolder.addFolder("Drive");
   drivePhysicsFolder.add(physicalVariables, 'currentRPM').min(0).max(1000);
   drivePhysicsFolder.add(physicalVariables, 'verticalRudderAlpha').min(-Math.PI / 2).max(Math.PI / 2);
   drivePhysicsFolder.add(physicalVariables, 'horizontalRudderAlpha').min(-Math.PI / 2).max(Math.PI / 2);

   const windPhysicsFolder = physicsFolder.addFolder("Wind");
   windPhysicsFolder.add(physicalVariables, 'airVelocity').min(0).max(200);
   windPhysicsFolder.add(physicalVariables.airDirection, 'x').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.airDirection, 'y').min(-1).max(1);
   windPhysicsFolder.add(physicalVariables.airDirection, 'z').min(-1).max(1);

   physicsFolder.open();
}

export default makeGui;