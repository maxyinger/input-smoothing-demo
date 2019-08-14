const raf = () => {
  const state = {
    listener: () => {},
    animationFrameId: null
  };

  const loop = timeStamp => {
    state.animationFrameId = requestAnimationFrame(timeStamp => {
      loop(timeStamp);
    });
    state.listener(timeStamp);
  };

  const stop = () => {
    cancelAnimationFrame(state.animationFrameId);
  };

  const start = listener => {
    state.listener = listener;
    loop(performance.now());

    return { stop };
  };

  return { start, stop };
};

export default raf;
