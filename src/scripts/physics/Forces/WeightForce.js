import Force from '../Force';

class WeightForce extends Force {
  // W = m * g
  constructor(mass, density, volume, gravity) {
    super();
    this.mass = mass;
    this.density = density;
    this.volume = volume;
    this.gravity = gravity;
  }

  calculate_mass() {

  }

  calculate_density() {

  }

  calculate_volume() {

  }

  calculate_gravity() {

  }



}
export default WeightForce;