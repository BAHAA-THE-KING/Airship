import { Vector3 } from 'three';
import Force from '../Force';

class ThurstForce extends Force {
  // T = 4.392 * 10^-8 * RPM * d^3.5 / pitch^0.5 * (4.233 * 10^-4 * RPM * pitch - V0)
  constructor() {
    super();
  };

  compute_direction(angleY, angleZ) {
    return new Vector3(
      Math.cos(angleZ) * Math.cos(angleY),
      Math.sin(angleZ),
      -Math.cos(angleZ) * Math.sin(angleY)
    );
  };

  calculate(RPM, diameter, Pitch, velocityLength, angleY, angleZ) {
    const rpm = RPM;
    const d = diameter;
    const pitch = Pitch;
    const v = velocityLength;

    this.direction = this.compute_direction(angleY, angleZ);

    const strength = 4.392 * (10 ** -8) * rpm * ((d ** 3.5) / (pitch ** 0.5)) * (4.233 * (10 ** -4) * rpm * pitch - v);

    const T = this.direction.clone().multiplyScalar(strength);

    return T;
  };
};
export default ThurstForce;