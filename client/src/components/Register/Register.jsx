import { useState } from "react";
import "../Register/Register.css";
import Progress from "./Progress";
import { Personal, Signup, Sociallinks } from "./Form";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const message = ["Learn React", "Apply for jobs", "Invest your income"];

const Register = () => {
  return (
    <div>
      <Multi />
    </div>
  );
};

const Multi = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  function handlePrev() {
    if (step > 1) setStep((step) => step - 1);
  }
  function handleNext() {
    if (step < 3) setStep((step) => step + 1);
  }

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <Personal />;
      case 2:
        return <Signup />;
      case 3:
        return <Sociallinks />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-['Inter']">
      <div className="bg-cyan-700">
        <div className="max-w-8xl mx-auto px-4 py-8">
          <img src={logo} alt="AluminiWave" className="h-18 " />
          <div className="text-white mt-8 text-center">
            <h1 className="text-4xl font-bold">Join Our Alumni Network</h1>
            <p className="mt-4 mb-2 text-lg opacity-90">
              Connect, Share, and Grow with Fellow Graduates
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 -mt-6 container ">
        <div className="flex justify-center">
          <div className="progress_container">
            <Progress totalSteps={totalSteps} step={step} />
            <div className={`${step >= 1 ? "circle active" : "circle"}`}>1</div>
            <div className={`${step >= 2 ? "circle active" : "circle"}`}>2</div>
            <div className={`${step >= 3 ? "circle active" : "circle"}`}>3</div>
          </div>
        </div>
        <div className="content flex justify-center">
          {/* <Message step={step} /> */}
          {renderSteps()}
        </div>
        <div className="btns">
          <button
            onClick={handlePrev}
            className={`${step <= 1 ? "btn disabled" : "btn"}`}
          >
            Prev
          </button>
          {step === 3 ? (
            <Link to="/dashboard">
              <button className="btn">Save & Register</button>
            </Link>
          ) : (
            <button
              onClick={handleNext}
              className={`${step === totalSteps ? "btn disabled" : "btn"}`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Message = ({ step }) => {
  return (
    <div>
      <h2>{message[step - 1]}</h2>
    </div>
  );
};

export default Register;
