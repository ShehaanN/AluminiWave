import React from 'react'

function Loginstep({ currentStep } ) {
      const steps = [1, 2, 3, 4];
  return (
    <div>
      
            <div className="stepper">
            {steps.map((step, index) => (
            <div key={index} className="step-container">
            <div className={`step ${step <= currentStep ? "active" : ""}`}>
            {step}
            </div>
            {index < steps.length - 1 && (
            <div className={`line ${step < currentStep ? "active-line" : ""}`}></div>
          )}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Loginstep
