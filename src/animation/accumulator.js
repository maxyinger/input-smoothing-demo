const accumulator = (reducer, init) => {
  const state = {
    currentValue: init,
    target: init
  };

  const next = listener => {
    state.currentValue = reducer(state.currentValue, state.target);
    listener(state.currentValue);
  };

  const update = v => (state.target = v);

  return {
    next,
    update
  };
};

export default accumulator;
