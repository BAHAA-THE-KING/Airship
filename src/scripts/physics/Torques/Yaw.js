import Torque from '../Torque.js';

class Yaw extends Torque {
  // M = Fdrag * d * sin(a)
  constructor(Force) {
    super(Force);
  }

  calculateM(alpha) {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)
    */
    const F = this.force.calculate();

    const d = 75 / 2;

    const alpha = alpha;

    const M = F * d * Math.sin(alpha);

    return M;
  };

  calculateMInverse(alphaInverse) {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)
    */
    const F = this.force.calculate();

    const d = 75 / 2;

    const alphaInverse = alphaInverse;

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