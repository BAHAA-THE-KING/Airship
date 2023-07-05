import { GUI } from 'lil-gui';

const gui = new GUI();

function makeGui(effectController, onChangeEffect, physicalVariables) {
   gui.addFolder("Skybox");
   gui.addFolder("Physics");
   let guiFolders = gui.folders;
   let skyboxFolder = guiFolders[0];
   let physicsFolder = guiFolders[1];
   skyboxFolder.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'elevation', 0, 90, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(onChangeEffect);
   skyboxFolder.add(effectController, 'exposure', 0, 1, 0.0001).onChange(onChangeEffect);
   skyboxFolder.close();

   physicsFolder.add(physicalVariables, 'gravity').min(0).max(1000);
   physicsFolder.open();
}

export default makeGui;