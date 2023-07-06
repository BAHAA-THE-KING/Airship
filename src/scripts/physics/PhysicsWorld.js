import { Vector3 } from "three";

import WeightForce from './Forces/WeightForce';
import BuoyancyForce from './Forces/BuoyancyForce';
import DragForce from './Forces/DragForce';
import ThurstForce from './Forces/ThurstForce';
import WindForce from './Forces/WindForce';

import hYaw from './Torques/hYaw';
import vYaw from './Torques/vYaw';

class PhysicsWorld {
  constructor(target, physicalVariables) {
    this.target = target;
    this.physicalVariables = physicalVariables;
    this.acceleration = new Vector3();
    this.velocity = new Vector3();
    this.forces = {
      "W": new WeightForce(),
      "B": new BuoyancyForce(),
      "D": new DragForce(),
      "T": new ThurstForce(),
      "Wi": new WindForce()
    };
    this.torques = {
      "H": new hYaw(this.forces["D"]),
      "V": new vYaw(this.forces["D"])
    };
  }

  calculate_sigma() {

  }

  calculate_acceleration() {

  }

  calculate_velocity() {

  }

  calculateMovement() {

  }

  move() {

  }

  update(deltaTime) {

  }
}

export default PhysicsWorld;