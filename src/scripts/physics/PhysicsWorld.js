import { Vector3 } from "three";
import WeightForce from './Forces/WeightForce';
import BuoyancyForce from './Forces/BuoyancyForce';
import DragForce from './Forces/DragForce';
import ThurstForce from './Forces/ThurstForce';
import WindForce from './Forces/WindForce';

class PhysicsWorld {
  constructor(target) {
    this.target = target;
    this.acceleration = new Vector3();
    this.velocity = new Vector3();
    this.forces = [
      new WeightForce(),
      new BuoyancyForce(),
      new DragForce(),
      new ThurstForce(),
      new WindForce()
    ];
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