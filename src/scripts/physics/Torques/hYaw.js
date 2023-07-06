import Yaw from './Yaw.js';

class hYaw extends Yaw {
  // Theta = ( M - M' ) / l
  constructor(Force) {
    super(Force);
  };
};

export default hYaw;