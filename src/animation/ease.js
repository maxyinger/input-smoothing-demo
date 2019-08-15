export const CssEase = {
  linear: "linear",
  inQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  outQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  inOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
  inCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  outCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  inOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  inQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
  outQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  inOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
  inQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  outQuin: "cubic-bezier(0.23, 1, 0.32, 1)",
  inOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
  inSine: "cubic-bezier(0.47, 0, 0.745, 0.715)",
  outSine: "cubic-bezier(0.39, 0.575, 0.565, 1)",
  inOutSine: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  inExpo: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
  outExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
  inOutExpo: "cubic-bezier(1, 0, 0, 1)",
  inCirc: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
  outCirc: "cubic-bezier(0.075, 0.82, 0.165, 1)",
  inOutCirc: "cubic-bezier(0.785, 0.135, 0.15, 0.86)"
};

export default {
  // No easing, no acceleration
  linear: t => t,

  // Accelerates fast, then slows quickly towards end.
  quadratic: t => t * (-(t * t) * t + 4 * t * t - 6 * t + 4),

  // Overshoots over 1 and then returns to 1 towards end.
  cubic: t => t * (4 * t * t - 9 * t + 6),

  // Overshoots over 1 multiple times - wiggles around 1.
  elastic: t =>
    t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15),

  // Accelerating from zero velocity
  inQuad: t => t * t,

  // Decelerating to zero velocity
  outQuad: t => t * (2 - t),

  // Acceleration until halfway, then deceleration
  inOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Accelerating from zero velocity
  inCubic: t => t * t * t,

  // Decelerating to zero velocity
  outCubic: t => --t * t * t + 1,

  // Acceleration until halfway, then deceleration
  inOutCubic: t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  // Accelerating from zero velocity
  inQuart: t => t * t * t * t,

  // Decelerating to zero velocity
  outQuart: t => 1 - --t * t * t * t,

  // Acceleration until halfway, then deceleration
  inOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),

  // Accelerating from zero velocity
  inQuint: t => t * t * t * t * t,

  // Decelerating to zero velocity
  outQuint: t => 1 + --t * t * t * t * t,

  // Acceleration until halfway, then deceleration
  inOutQuint: t =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,

  // Accelerating from zero velocity
  inSine: t => -Math.cos(t * (Math.PI / 2)) + 1,

  // Decelerating to zero velocity
  outSine: t => Math.sin(t * (Math.PI / 2)),

  // Accelerating until halfway, then decelerating
  inOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,

  // Exponential accelerating from zero velocity
  inExpo: t => Math.pow(2, 10 * (t - 1)),

  // Exponential decelerating to zero velocity
  outExpo: t => -Math.pow(2, -10 * t) + 1,

  // Exponential accelerating until halfway, then decelerating
  inOutExpo: t => {
    t /= 0.5;
    if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2;
    t--;
    return (-Math.pow(2, -10 * t) + 2) / 2;
  },

  // Circular accelerating from zero velocity
  inCirc: t => -Math.sqrt(1 - t * t) + 1,

  // Circular decelerating to zero velocity Moves VERY fast at the beginning and
  // then quickly slows down in the middle. This tween can actually be used
  // in continuous transitions where target value changes all the time,
  // because of the very quick start, it hides the jitter between target value changes.
  outCirc: t => Math.sqrt(1 - (t = t - 1) * t),

  // Circular acceleration until halfway, then deceleration
  inOutCirc: t => {
    t /= 0.5;
    if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
    t -= 2;
    return (Math.sqrt(1 - t * t) + 1) / 2;
  }
};
