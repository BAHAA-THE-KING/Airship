import Force from '../Force';

class WindForce extends Force {
  // Wi = Cd * p * v^2 * A
  constructor() {
    super();
  }
  compute_direction(direction) {
    if (direction)
      return direction.clone();
    return new Vector3();
  };

  calculate_cd() {
    return 0.08;
  };

  calculate_area(angleY) {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)

    f(x)=π ((75)/(2)) ((18.9)/(2)) cos(x)+π ((18.9)/(2)) ((18.2)/(2)) sin(x)
    */
    const sideArea = Math.PI * (75 / 2) * (18.9 / 2);
    const frontArea = Math.PI * (18.9 / 2) * (18.2 / 2);
    const sideFactor = Math.abs(Math.cos(angleY));
    const frontFactor = Math.abs(Math.sin(angleY));
    return sideArea * sideFactor + frontArea * frontFactor;
  };

  calculate_density(pressure, airMolarMass, R, temperature) {
    return (pressure * airMolarMass) / (R * temperature);
  };

  calculate_velocityStrength(velocityStrength) {
    return velocityStrength;
  };

  calculate(pressure, airMolarMass, R, temperature, velocity, velocityStrength, angleY) {
    const cd = calculate_cd();
    const A = calculate_area(angleY);
    const p = calculate_density(pressure, airMolarMass, R, temperature);
    const v = calculate_velocityStrength(velocityStrength);

    this.direction = this.compute_direction(velocity);

    const strength = cd * A * p * (v ** 2);

    const Wind = this.direction.clone().multiplyScalar(strength);

    return Wind;
  };
}
export default WindForce;