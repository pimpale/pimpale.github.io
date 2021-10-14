function torusNoise(x:number, y:number) {

    const noiseScale =

    const R = 5;
    const r = 3;
    const theta = x*Math.PI;
    const phi = y*Math.PI;
    const noise  = noise3D(
      (R + r*Math.cos(theta))*Math.cos(phi),
      (R + r*Math.cos(theta))*Math.sin(phi),
      r*Math.sin(theta),
    );
    return noise;
}
