import React, { useEffect, useState } from "react";

const Opacity = ({ children }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
    return () => setOpacity(1);
  }, []);

  return (
    <div
      style={{
        opacity,
        position: "absolute",
        transition: "0.1s opacity"
      }}
    >
      {children}
    </div>
  );
};

export default Opacity;
