import React from "react";
import "./Loginstep.css"; // Import CSS file

function Loginstep({ currentStep }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="step-container">
      {steps.map((step, index) => (
        <div key={index} className="step-wrapper">
          <div
            className={`step ${
              step === 1 ? "first-active" : step <= currentStep ? "active" : ""
            }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`line ${
                step === 1 ? "first-active-line" : step < currentStep ? "active-line" : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Loginstep;
