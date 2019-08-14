const lerp = percent => (start, end) => {
  return Object.keys(start).reduce((acc, key) => {
    const delta = end[key] - start[key];
    acc[key] = start[key] + delta * percent;

    return acc;
  }, {});
};

export default lerp;
