import Force from '../Force';

class BuoyancyForce extends Force {
  // B = p * V * g
  constructor(density, volume, gravity) {
    super();
    this.density = density;
    this.volume = volume;
    this.gravity = gravity;
  }

  calculate_density() {

  }

  calculate_volume() {

  }

  calculate_gravity() {

  }



}
export default BuoyancyForce;