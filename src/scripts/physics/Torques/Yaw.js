import Torque from '../Torque.js';

class Yaw extends Torque {
  // M = Fdrag * d * sin(a)
  constructor(I) {
    super();
    this.I = I;
  }

  calculateAngle() {

  }


}
export default Yaw;