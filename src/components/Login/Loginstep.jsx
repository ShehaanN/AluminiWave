import React, { useState } from 'react'
import './Loginstep.css'

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
export default function SignupProcess() {
      const [currentStep, setCurrentStep] = useState(1);
    
      const nextStep = () => {
        if (currentStep < 4) {
          setCurrentStep(currentStep + 1);
        }
      };
    
      return (
        <div className="container">
          <h2>Signup Process</h2>
          <Stepper currentStep={currentStep} />
          <button onClick={nextStep} disabled={currentStep === 4}>
            Next
          </button>
        </div>
      );
    }


