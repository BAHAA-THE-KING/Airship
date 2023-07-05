import Force from '../Force';

class ThurstForce extends Force {
  // T = 4.392 * 10^-8 * RPM * d^3.5 / pitch^0.5 * (4.233 * 10^-4 * RPM * pitch - V0)
  constructor(rpm, diameter, pitch, velocity) {
    super();
    this.rpm = rpm;
    this.diameter = diameter;
    this.pitch = pitch;
    this.velocity = velocity;

  }
  calculate_rpm() {

  }
  calculate_diameter() {

  }
  calculate_pitch() {

  }
  calculate_velocity() {

  }


}
export default ThurstForce;