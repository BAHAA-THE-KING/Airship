import { Vector3 } from 'three';
import Force from '../Force';

class DragForce extends Force {
  // D = 0.5 * Cd * A * p * v2
  constructor() {
    super();
  };

  compute_direction(movement) {
    if (movement)
      return movement.clone().nomalize().negate();
    return new Vector3();
  };

  calculate_cd() {
    return 0.08;
  };

  calculate_area() {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)

    f(x)=π ((75)/(2)) ((18.9)/(2)) cos(x)+π ((18.9)/(2)) ((18.2)/(2)) sin(x)
    */
    const frontArea = Math.PI * (18.9 / 2) * (18.2 / 2);
    return frontArea;
  };

  calculate_density(pressure, airMolarMass, R, temperature) {
    return (pressure * airMolarMass) / (R * temperature);
  };

  calculate_velocity(velocity) {
    return velocity.length();
  };

  calculate(pressure, airMolarMass, R, temperature, velocity) {
    const cd = this.calculate_cd();
    const A = this.calculate_area();
    const p = this.calculate_density(pressure, airMolarMass, R, temperature);
    const v = this.calculate_velocity(velocity);

    this.direction = this.compute_direction(velocity);

    const strength = 0.5 * cd * A * p * (v ** 2);

    const D = this.direction.clone().multiplyScalar(strength);

    return D;
  };
};

export default DragForce;