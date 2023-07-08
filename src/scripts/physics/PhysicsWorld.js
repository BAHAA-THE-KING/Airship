import { Vector3 } from "three";

import WeightForce from './Forces/WeightForce';
import BuoyancyForce from './Forces/BuoyancyForce';
import DragForce from './Forces/DragForce';
import ThurstForce from './Forces/ThurstForce';
import WindForce from './Forces/WindForce';

import hYaw from './Torques/hYaw';
import vYaw from './Torques/vYaw';

class PhysicsWorld {
  constructor(target, physicalVariables, controls) {
    this.target = target;
    this.physicalVariables = physicalVariables;
    this.controls = controls;

    this.acceleration = new Vector3();
    this.velocity = new Vector3();
    this.movement = new Vector3();
    this.height = 0;
    this.angleY = 0;
    this.angleZ = 0;

    this.constants = {
      R: 8.134,
      cd: 0.08
    };

    this.editableConstants = {
      airMolarMass: 0.02897,
      heliumMolarMass: 0.004003,
      diameter: 120,
      pitch: 30
    };

    this.sizes = {
      length: 75,
      height: 18.9,
      width: 18.2
    };

    this.beginValues = {
      pressure: 101300,
      temperature: 288.15
    };

    this.forces = {
      W: new WeightForce(),
      B: new BuoyancyForce(),
      D: new DragForce(),
      T: new ThurstForce(),
      Wi: new WindForce()
    };
    this.torques = {
      H: new hYaw(this.forces.D),
      V: new vYaw(this.forces.D)
    };
  }

  target;
  physicalVariables;

  acceleration;
  velocity;
  movement;
  height;
  angleY;
  angleZ;

  constants;

  editableConstants;

  sizes;

  beginValues;

  forces;
  torques;

  calculate_pressure() {
    const H = this.height;

    const P = this.beginValues.pressure - 9.45 * H;

    return P;
  }

  calculate_temperature() {
    const H = this.height;

    const T = this.beginValues.temperature - 6.5 * (10 ** -3) * H;

    return T;
  }

  calculate_airDensity() {
    const pressure = this.calculate_pressure();
    const airMolarMass = this.editableConstants.airMolarMass;
    const R = this.constants.R;
    const temperature = this.calculate_temperature();

    const density = (pressure * airMolarMass) / (R * temperature);

    return density;
  };

  calculate_heliumDensity() {
    const pressure = this.calculate_pressure();
    const heliumMolarMass = this.editableConstants.heliumMolarMass;
    const R = this.constants.R;
    const temperature = this.calculate_temperature();

    const density = (pressure * heliumMolarMass) / (R * temperature);

    return density;
  };

  calculate_mass() {
    const loadMass = this.physicalVariables.loadMass;
    const heliumVolume = this.physicalVariables.maxVolume - this.physicalVariables.airVolume;
    const airVolume = this.physicalVariables.airVolume;

    const airDensity = this.calculate_airDensity();
    const heliumDensity = this.calculate_heliumDensity();

    const mass = loadMass + heliumDensity * heliumVolume + airDensity * airVolume;

    return mass;
  };

  calculate_gravity() {
    const gravity = this.physicalVariables.gravity;

    return gravity;
  };

  calculate_volume() {
    const heliumVolume = this.physicalVariables.maxVolume - this.physicalVariables.airVolume;
    const airVolume = this.physicalVariables.airVolume;

    const volume = heliumVolume + airVolume;

    return volume;
  };

  calculate_dragArea(angleZ) {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)
  
    f(x)=π ((75)/(2)) ((18.9)/(2)) cos(x)+π ((18.9)/(2)) ((18.2)/(2)) sin(x)
    */
    const sideArea = Math.PI * (this.sizes.length / 2) * (this.sizes.width / 2);
    const frontArea = Math.PI * (this.sizes.height / 2) * (this.sizes.width / 2);

    const sideFactor = Math.abs(Math.cos(angleZ));
    const frontFactor = Math.abs(Math.sin(angleZ));

    return sideArea * sideFactor + frontArea * frontFactor;
  };

  calculate_velocityLength() {
    return this.velocity.length();
  };

  calculate_rpm() {
    return this.physicalVariables.currentRPM;
  };

  calculate_diameter() {
    return this.editableConstants.diameter;
  };

  calculate_pitch() {
    return this.editableConstants.pitch;
  };

  calculate_area(angleY) {
    /**
    Length: 75 meters (246 feet)
    Height: 18.9 meters (62 feet)
    Width: 18.2 meters (60 feet)
  
    f(x)=π ((75)/(2)) ((18.9)/(2)) cos(x)+π ((18.9)/(2)) ((18.2)/(2)) sin(x)
    */
    const sideArea = Math.PI * (this.sizes.length / 2) * (this.sizes.height / 2);
    const frontArea = Math.PI * (this.sizes.height / 2) * (this.sizes.width / 2);

    const sideFactor = Math.abs(Math.cos(angleY));
    const frontFactor = Math.abs(Math.sin(angleY));

    return sideArea * sideFactor + frontArea * frontFactor;
  };

  calculate_windVelocityLength() {
    const windVelocityLength = this.physicalVariables.windVelocity;

    return windVelocityLength;
  }

  calculate_windVelocityDirection() {
    const windX = this.physicalVariables.windDirection.x;
    const windY = this.physicalVariables.windDirection.y;
    const windZ = this.physicalVariables.windDirection.z;

    const windVelocityDirection = new Vector3(
      windX,
      windY,
      windZ
    );

    return windVelocityDirection;
  }

  calculate_sigma() {
    const mass = this.calculate_mass();
    const gravity = this.calculate_gravity();
    const density = this.calculate_airDensity();
    const volume = this.calculate_volume();
    const cd = this.constants.cd;
    const dragArea = this.calculate_dragArea(this.angleZ);
    const velocityLength = this.calculate_velocityLength();
    const movement = this.movement;
    const rpm = this.calculate_rpm();
    const diameter = this.calculate_diameter();
    const pitch = this.calculate_pitch();
    const area = this.calculate_area(this.angleY);
    const windVelocityDirection = this.calculate_windVelocityDirection();
    const windVelocityLength = this.calculate_windVelocityLength();

    const W = this.forces.W.calculate(mass, gravity);
    const B = this.forces.B.calculate(density, volume, gravity);
    const D = this.forces.D.calculate(cd, dragArea, density, velocityLength, movement);
    const T = this.forces.T.calculate(rpm, diameter, pitch, velocityLength).multiplyScalar(2);
    const Wi = this.forces.Wi.calculate(cd, area, density, windVelocityLength, windVelocityDirection);

    console.log("Weight = ", W);
    console.log("Buoyancy = ", B);
    console.log("Drag = ", D);
    console.log("Thrust = ", T);
    console.log("Wind = ", Wi);

    const Sigma = new Vector3().addVectors(
      W,
      new Vector3().addVectors(
        B,
        new Vector3().addVectors(
          D,
          new Vector3().addVectors(
            T,
            Wi
          )
        )
      )
    );

    return Sigma;
  }

  calculate_acceleration() {
    const sigma = this.calculate_sigma();
    const m = this.calculate_mass();

    const a = sigma.divideScalar(m);

    console.log("a = ", a);
    console.log("m = ", m);

    return a;
  }

  calculate_velocity(deltaTime) {
    const v0 = this.velocity;
    const t = deltaTime;
    const a = this.calculate_acceleration();

    const v = new Vector3().addVectors(v0, a.clone().multiplyScalar(t));

    this.velocity = v.clone();
    console.log("v = ", v);

    return v;
  }

  calculateMovement(deltaTime) {
    const t = deltaTime;
    const v = this.calculate_velocity(t);

    const d = v.clone().multiplyScalar(t);

    this.movement = d.clone();

    return d;
  }

  move(d) {
    this.target.move(d.x, d.y, d.z);
  }

  update(deltaTime) {
    if (!this.target.isReady) return;
    const d = this.calculateMovement(deltaTime);
    this.move(d);
    this.controls.target = this.target.position.clone();
    this.controls.object.position.add(d);
  }
}

export default PhysicsWorld;