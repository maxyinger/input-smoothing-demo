import Ease from "./ease";
import lerp from "./lerp";
import raf from "./raf";

const tween = ({
  from,
  to,
  duration = 300,
  ease = Ease.linear,
  onComplete = () => {}
}) => {
  const state = {
    startTime: 0,
    from,
    to,
    current: from,
    updateStartTime: true,
    endTween: false
  };

  const start = listener => {
    const { start, stop } = raf();
    const stopRaf = start(timeStamp => {
      if (state.updateStartTime) {
        state.startTime = timeStamp;
        state.updateStartTime = false;
      }

      const deltaTime = timeStamp - state.startTime;
      const progress = Math.max(Math.min(deltaTime / duration, 1), 0);
      state.current = lerp(ease(progress))(state.from, state.to);

      listener(state.current);

      if (progress === 1) {
        stop();
        onComplete();
      }
    });

    return {
      stop: stopRaf
    };
  };

  return { start };
};

export default tween;
