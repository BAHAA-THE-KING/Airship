import { Vector3 } from 'three';
import Force from '../Force';

class BuoyancyForce extends Force {
  // B = p * V * g
  constructor() {
    super();
  };

  compute_direction() {
    return new Vector3(0, +1, 0);
  };

  calculate_density(pressure, airMolarMass, R, temperature) {
    return (pressure * airMolarMass) / (R * temperature);
  };

  calculate_volume(heliumVolume, airVolume) {
    return heliumVolume + airVolume;
  };

  calculate_gravity(gravity) {
    return gravity;
  };

  calculate(pressure, airMolarMass, R, temperature, heliumVolume, airVolume, gravity) {
    const p = calculate_density(pressure, airMolarMass, R, temperature)
    const V = calculate_volume(heliumVolume, airVolume)
    const g = calculate_gravity(gravity)

    const strength = p * V * g;

    const B = this.direction.clone().multiplyScalar(strength);

    return B;
  };
};

export default BuoyancyForce;