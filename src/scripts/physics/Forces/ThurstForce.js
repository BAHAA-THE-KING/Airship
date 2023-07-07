import { Vector3 } from 'three';
import Force from '../Force';

class ThurstForce extends Force {
  // T = 4.392 * 10^-8 * RPM * d^3.5 / pitch^0.5 * (4.233 * 10^-4 * RPM * pitch - V0)
  constructor() {
    super();
  };

  compute_direction() {
    return new Vector3(+1, 0, 0);
  };

  calculate(RPM, diameter, Pitch, velocityLength) {
    const rpm = RPM;
    const d = diameter;
    const pitch = Pitch;
    const v = velocityLength;

    const strength = 4.392 * (10 ** -8) * rpm * ((d ** 3.5) / (pitch ** 0.5)) * (4.233 * (10 ** -4) * rpm * pitch - v);

    const T = this.direction.clone().multiplyScalar(strength);

    return T;
  };
};
export default ThurstForce;