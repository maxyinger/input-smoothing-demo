const scan = (reducer, init) => {
  const state = {
    accumulator: init,
    reducer: reducer,
    listener: () => {}
  };

  const next = v => {
    state.accumulator = reducer(state.accumulator, v);
    state.listener(state.accumulator);
  };

  const start = listener => {
    state.listener = listener;

    return { next };
  };

  return { start };
};

export default scan;
