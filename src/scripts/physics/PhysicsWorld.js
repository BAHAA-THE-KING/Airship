import { Vector3 } from "three";

import WeightForce from './Forces/WeightForce';
import BuoyancyForce from './Forces/BuoyancyForce';
import DragForce from './Forces/DragForce';
import ThurstForce from './Forces/ThurstForce';
import WindForce from './Forces/WindForce';

import hYaw from './Torques/hYaw';
import vYaw from './Torques/vYaw';
import { collisions } from "../Environment/spheres";

class PhysicsWorld {
  constructor(target, physicalVariables, controls, output, outputFolder) {
    this.target = target;
    this.physicalVariables = physicalVariables;
    this.controls = controls;
    this.output = output;
    this.outputFolder = outputFolder;
    this.warning = document.querySelector("#warning");

    this.acceleration = new Vector3();
    this.velocity = new Vector3();
    this.movement = new Vector3();
    this.height = 0;
    this.angularVelocityY = 0;
    this.angularVelocityZ = 0;
    this.angleY = 0;
    this.angleZ = 0;

    this.constants = {
      R: 8.134,
      cd: 0.08
    };

    this.editableConstants = {
      airMolarMass: 0.02897,
      heliumMolarMass: 0.004003,
      diameter: 140,
      pitch: 30
    };

    this.sizes = {
      length: 75,
      height: 18.9,
      width: 18.2,
      rudderWidth: 2,
      rudderHeight: 5
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
  output;
  outputFolder;
  warning;

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
    const pressure = this.beginValues.pressure;
    const heliumMolarMass = this.editableConstants.heliumMolarMass;
    const R = this.constants.R;
    const temperature = this.beginValues.temperature;

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

  calculate_rudderArea() {
    const width = this.sizes.rudderWidth;
    const height = this.sizes.rudderHeight;

    return width * height;
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

  calculateVAlpha() {
    const alpha = this.physicalVariables.verticalRudder * Math.PI / 180;

    return alpha;
  }

  calculateHAlpha() {
    const alpha = this.physicalVariables.horizontalRudder * Math.PI / 180;

    return alpha;
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
    const T = this.forces.T.calculate(rpm, diameter, pitch, velocityLength, this.angleY, this.angleZ).multiplyScalar(2);
    const Wi = this.forces.Wi.calculate(cd, area, density, windVelocityLength, windVelocityDirection);

    //this.output.WeightX = W.x.toFixed(4)+" N";
    this.output.WeightY = W.y.toFixed(4) + " N";
    //this.output.WeightZ = W.z.toFixed(4)+" N";

    //this.output.BuoyancyX = B.x.toFixed(4)+" N";
    this.output.BuoyancyY = B.y.toFixed(4) + " N";
    //this.output.BuoyancyZ = B.z.toFixed(4)+" N";

    this.output.DragX = D.x.toFixed(4) + " N";
    this.output.DragY = D.y.toFixed(4) + " N";
    this.output.DragZ = D.z.toFixed(4) + " N";

    this.output.ThrustX = T.x.toFixed(4) + " N";
    this.output.ThrustY = T.y.toFixed(4) + " N";
    this.output.ThrustZ = T.z.toFixed(4) + " N";
    this.output.Thrust = T.length().toFixed(4) + " N";

    this.output.WindX = Wi.x.toFixed(4) + " N";
    this.output.WindY = Wi.y.toFixed(4) + " N";
    this.output.WindZ = Wi.z.toFixed(4) + " N";

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

    this.output.AccelerationX = a.x.toFixed(4) + "m.s⁻²";
    this.output.AccelerationY = a.y.toFixed(4) + "m.s⁻²";
    this.output.AccelerationZ = a.z.toFixed(4) + "m.s⁻²";
    this.output.Acceleration = a.length().toFixed(4) + "m.s⁻²";


    return a;
  }

  calculate_velocity(deltaTime) {
    const v0 = this.velocity;
    const t = deltaTime;
    const a = this.calculate_acceleration();

    const v = new Vector3().addVectors(v0, a.clone().multiplyScalar(t));

    this.velocity = v.clone();

    this.output.VelocityX = v.x.toFixed(4) + "m.s⁻¹"
    this.output.VelocityY = v.y.toFixed(4) + "m.s⁻¹"
    this.output.VelocityZ = v.z.toFixed(4) + "m.s⁻¹"
    this.output.Velocity = v.length().toFixed(4) + "m.s⁻¹"

    return v;
  }

  calculateMovement(deltaTime) {
    const t = deltaTime;
    const v = this.calculate_velocity(t);

    const d = v.clone().multiplyScalar(t);

    this.movement = d.clone();

    return d;
  }

  calculateRotation(deltaTime) {
    const density = this.calculate_airDensity();
    const cd = this.constants.cd;
    const dragArea = this.calculate_rudderArea();
    const velocityLength = this.calculate_velocityLength();
    const movement = this.movement;
    const vAlpha = this.calculateVAlpha();
    const hAlpha = this.calculateHAlpha();

    const hD = this.forces.D.calculate(cd, dragArea, density, velocityLength, movement);
    if (!hAlpha) hD.y = 0;
    const hY = this.torques.H.calculate(vAlpha, -vAlpha, hD.length());

    this.angleZ = this.angleZ + (hAlpha / 10 * 30 - this.angleZ) / 400;

    if (vAlpha)
      this.angularVelocityY = hY * deltaTime;
    else
      this.angularVelocityY = Math.sign(this.angularVelocityY) * Math.max(Math.abs(this.angularVelocityY) - 0.01, 0);

    this.angleY += this.angularVelocityY;
  }

  move(d) {
    if (this.physicalVariables.collide) {
      let bdistance = -1;
      let boundingBox = this.target.box;

      let points = [
        {
          x: boundingBox.min.x,
          y: boundingBox.min.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.min.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.min.x,
          y: boundingBox.max.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.min.x,
          y: boundingBox.min.y,
          z: boundingBox.max.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.max.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.min.y,
          z: boundingBox.max.z
        },
        {
          x: boundingBox.min.x,
          y: boundingBox.max.y,
          z: boundingBox.max.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.max.y,
          z: boundingBox.max.z
        }
      ];

      collisions.find(
        sphere =>
        (
          points.find(
            point => {
              const dist = (
                (1 / sphere.scaleX * ((point.x - sphere.posX) ** 2)) +
                (1 / sphere.scaleY * ((point.y - sphere.posY) ** 2)) +
                (1 / sphere.scaleZ * ((point.z - sphere.posZ) ** 2))
              );
              if (dist <= (sphere.radius ** 2)) {
                bdistance = dist;
                return true;
              }
              return false;
            }
          )
        )
      );

      let adistance = -1;
      this.target.move(d.x, d.y, d.z);
      this.controls.target = this.controls.target.add(d);
      this.controls.object.position.add(d);

      boundingBox = this.target.box;

      points = [
        {
          x: boundingBox.min.x,
          y: boundingBox.min.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.min.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.min.x,
          y: boundingBox.max.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.min.x,
          y: boundingBox.min.y,
          z: boundingBox.max.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.max.y,
          z: boundingBox.min.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.min.y,
          z: boundingBox.max.z
        },
        {
          x: boundingBox.min.x,
          y: boundingBox.max.y,
          z: boundingBox.max.z
        },
        {
          x: boundingBox.max.x,
          y: boundingBox.max.y,
          z: boundingBox.max.z
        }
      ];

      if (
        collisions.find(
          sphere =>
          (
            points.find(
              point => {
                const dist = (
                  ((1 / sphere.scaleX) * ((point.x - sphere.posX) ** 2)) +
                  ((1 / sphere.scaleY) * ((point.y - sphere.posY) ** 2)) +
                  ((1 / sphere.scaleZ) * ((point.z - sphere.posZ) ** 2))
                );
                if (dist <= (sphere.radius ** 2)) {
                  adistance = dist;
                  return true;
                }
                return false;
              }
            )
          )
        )
      ) {
        if (adistance === -1 || adistance < bdistance) {
          this.target.move(-d.x, -d.y, -d.z);
          this.controls.target = this.controls.target.sub(d);
          this.controls.object.position.sub(d);
          warning.classList.add("warning");
        } else {
          warning.classList.remove("warning");
        }
      }
    } else {
      this.target.move(d.x, d.y, d.z);
      this.controls.target = this.controls.target.add(d);
      this.controls.object.position.add(d);
      warning.classList.remove("warning");
    }
  }

  rotate(h, v) {
    this.target.rotateTo(0, h, v);
  }

  update(deltaTime) {
    if (!this.target.isReady) return;
    this.target.rotateRudderTo(this.calculateHAlpha(), this.calculateVAlpha());

    this.target.rotateFan(this.physicalVariables.currentRPM / 3000);

    if (!this.physicalVariables.start) return;
    const d = this.calculateMovement(deltaTime);

    this.move(d);
    this.height = this.target.position.y;

    this.calculateRotation(deltaTime);
    this.rotate(this.angleY, this.angleZ);

    this.output.PositionX = this.target.position.x.toFixed(4) + "m";
    this.output.PositionY = this.target.position.y.toFixed(4) + "m";
    this.output.PositionZ = this.target.position.z.toFixed(4) + "m";

    this.outputFolder.children.map(e => e.updateDisplay());
  }
}

export default PhysicsWorld;