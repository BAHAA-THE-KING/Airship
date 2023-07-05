import Force from '../Force';

class WindForce extends Force {
  // Wi = Cd * p * v^2 * A
  constructor(cd, area, density, velocity) {
    super();
    this.cd = cd;
    this.area = area;
    this.density = density;
    this.velocity = velocity;
  }

  calculate_cd() {

  }

  calculate_area() {

  }

  calculate_density() {

  }

  calculate_velocity() {

  }



}
export default WindForce;