import { Vector3 } from 'three';
import Force from '../Force';

class WeightForce extends Force {
  // W = m * g
  constructor() {
    super();
  }

  compute_direction() {
    return new Vector3(0, -1, 0);
  };

  calculate_mass(loadMass, heliumVolume, airVolume, pressure, airMolarMass, heliumMolarMass, R, temperature) {
    const airDensity = (pressure * airMolarMass) / (R * temperature);
    const heliumDensity = (pressure * heliumMolarMass) / (R * temperature);

    return loadMass + heliumDensity * heliumVolume + airDensity * airVolume;
  };

  calculate_gravity(gravity) {
    return gravity;
  };

  calculate(loadMass, heliumVolume, airVolume, pressure, airMolarMass, heliumMolarMass, R, temperature, gravity) {
    const m = this.calculate_mass(loadMass, heliumVolume, airVolume, pressure, airMolarMass, heliumMolarMass, R, temperature);
    const g = this.calculate_gravity(gravity);

    const strength = m * g;

    const W = this.direction.clone().multiplyScalar(strength);

    return W;
  };
}
export default WeightForce;