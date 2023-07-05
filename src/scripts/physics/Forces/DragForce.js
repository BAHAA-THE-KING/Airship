import Force from '../Force';

class DragForce extends Force {
  // D = 0.5 * Cd * A * p * v2
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
export default DragForce;