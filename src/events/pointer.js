import { ORIGIN_2D } from "../constants";
const pointer = (init = ORIGIN_2D) => {
  return {
    start: next => {
      next(init);
      const mouseHandler = ({ clientX: x, clientY: y }) => next({ x, y });
      window.addEventListener("mousemove", mouseHandler, { passive: true });

      const touchHandler = ({ touches }) => {
        const { clientX: x, clientY: y } = touches[0];
        next({ x, y });
      };

      return {
        stop: () => {
          window.removeEventListener("mousemove", mouseHandler, {
            passive: true
          });
          window.removeEventListener("mousemove", touchHandler, {
            passive: true
          });
        }
      };
    }
  };
};

export default pointer;
