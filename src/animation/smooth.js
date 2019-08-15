import raf from "./raf";
import scan from "./scan";
import lerp from "./lerp";

const smooth = (init, { roundness = 0.1 } = {}) => {
  const state = {
    scan: null,
    loop: null,
    target: init
  };

  const update = v => {
    state.target = v;
  };

  const stop = () => {
    state.loop.stop();
  };

  const start = listener => {
    state.scan = scan(lerp(roundness), init).start(listener);

    state.loop = raf().start(() => {
      state.scan.next(state.target);
    });

    return { update, stop };
  };

  return { start };
};

export default smooth;
