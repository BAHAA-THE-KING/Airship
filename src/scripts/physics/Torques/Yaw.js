import Torque from '../Torque.js';

class Yaw extends Torque {
  // M = Fdrag * d * sin(a)
  constructor(Force) {
    super(Force);
  }

  calculateM(Alpha) {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)
    */
    const F = this.force.calculate();

    const d = 75 / 2;

    const alpha = Alpha;

    const M = F * d * Math.sin(alpha);

    return M;
  };

  calculateMInverse(AlphaInverse) {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)
    */
    const F = this.force.calculate();

    const d = 75 / 2;

    const alphaInverse = AlphaInverse;

    const MInverse = F * d * Math.sin(alphaInverse);

    return MInverse;
  };

  calculateL() {
    return 10000;
  };

  calculate(alpha, alphaInverse) {
    const M = this.calculateM(alpha);

    const MInverse = this.calculateM(alphaInverse);

    const l = this.calculateL();

    const Theta = (M - MInverse) / l;

    return Theta;
  };
}
export default Yaw;