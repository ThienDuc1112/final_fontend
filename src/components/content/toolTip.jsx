import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
const CustomTooltip = ({ content, position, duration, count }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  let mycount = Cookies.get("count");
  useEffect(() => {
    if (count > mycount) {
      setShowTooltip(true);

      const timeout = setTimeout(() => {
        setShowTooltip(false);
      }, duration);
      Cookies.set("count", count);

      return () => clearTimeout(timeout);
    }
  }, [count]);

  return (
    <div className={`custom-tooltip ${showTooltip ? "show" : ""} ${position}`}>
      {content}
    </div>
  );
};

export default CustomTooltip;
