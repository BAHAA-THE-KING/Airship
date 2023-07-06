import Yaw from './Yaw.js';

class vYaw extends Yaw {
  // Theta = ( M - M' ) / l
  constructor(Force) {
    super(Force);
  };
};

export default vYaw;