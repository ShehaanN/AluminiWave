import React from "react";

const Progress = ({ totalSteps, step }) => {
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  return (
    <div
      className="progress "
      style={{
        height: "4px",
        background: "#ddd",
        width: "100%",
        transition: "all 0.4s ease-in",
      }}
    >
      <div
        className="progress"
        style={{
          height: "4px",
          background: "#269EB2",
          width: `${progress}%`,
          transition: "all 0.4s ease-in",
        }}
      ></div>
    </div>
  );
};

export default Progress;
