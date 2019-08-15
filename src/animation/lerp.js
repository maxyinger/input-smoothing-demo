const lerp = roundness => (accum, target) => {
  return Object.keys(accum).reduce((acc, key) => {
    acc[key] = (1 - roundness) * accum[key] + target[key] * roundness;
    return acc;
  }, {});
};

export default lerp;
