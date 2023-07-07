import { Vector3 } from 'three';
import Force from '../Force';

class WindForce extends Force {
  // Wi = Cd * p * v^2 * A
  constructor() {
    super();
  }
  compute_direction(direction) {
    if (direction)
      return direction.clone();
    return new Vector3();
  };

  calculate(Cd, area, density, windVelocityLength, windVelocityDirection) {
    const cd = Cd;
    const A = area;
    const p = density;
    const v = windVelocityLength;

    this.direction = this.compute_direction(windVelocityDirection);

    const strength = 0.5 * cd * A * p * (v ** 2);

    const Wind = this.direction.clone().multiplyScalar(strength);

    return Wind;
  };
}
export default WindForce;