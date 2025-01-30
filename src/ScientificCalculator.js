import React, { useState } from "react";
import * as math from "mathjs";
import nerdamer from "nerdamer";
import "nerdamer/all";  // Ensure all modules are loaded
import "nerdamer/Calculus";
import "nerdamer/Algebra";
import "nerdamer/Solve";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [variable, setVariable] = useState("x"); // Default variable is "x"
  const [result, setResult] = useState("");

  const handleDifferentiation = (variable) => {
    try {
      const derivative = math.derivative(input, variable).toString();
      setResult(derivative);
    } catch {
      setResult("Error");
    }
  };

  const handleSecondDifferentiation = (variable) => {
    try {
      const secondDerivative = math.derivative(math.derivative(input, variable), variable).toString();
      setResult(secondDerivative);
    } catch {
      setResult("Error");
    }
  };

  const handleThirdDifferentiation = (variable) => {
    try {
      const thirdDerivative = math.derivative(math.derivative(math.derivative(input, variable), variable), variable).toString();
      setResult(thirdDerivative);
    } catch {
      setResult("Error");
    }
  };

  const handleIndefiniteIntegration = () => {
    try {
      const integral = nerdamer(`integrate(${input}, x)`).toString();
      setResult(integral);
    } catch {
      setResult("Error");
    }
  };

  const handleDoubleIntegration = () => {
    try {
      const integralWithRespectToY = nerdamer(`integrate(${input}, y)`).toString();
      const integralXWithLimits = nerdamer(`${integralWithRespectToY}`).toString();
      setResult(integralXWithLimits);
    } catch {
      setResult("Error");
    }
  };

  const handleTripleIntegration = () => {
    try {
      const integralWithRespectToY = nerdamer(`integrate(${input}, y)`).toString();
      const integralWithRespectToZ = nerdamer(`integrate(${integralWithRespectToY}, z)`).toString();
      const integralXWithLimits = nerdamer(`${integralWithRespectToZ}`).toString();
      setResult(integralXWithLimits);
    } catch {
      setResult("Error");
    }
  };

  const handleSimplify = () => {
    try {
      const simplified = nerdamer(input).simplify().toString();
      setResult(simplified);
    } catch {
      setResult("Error");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerContainerStyle}>
        <h1 style={headerStyle}>Scientific Calculator</h1>
      </div>
      <div style={calculatorStyle}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter expression (e.g., 3*x^2*y + 2*y^3)"
          style={inputStyle}
        />
        <div style={buttonContainerStyle}>
          <input
            type="text"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            placeholder="Variable (e.g., x)"
            style={variableInputStyle}
          />
          <button style={buttonStyle} onClick={() => handleDifferentiation(variable)}>d/d{variable}</button>
          <button style={buttonStyle} onClick={() => handleSecondDifferentiation(variable)}>d²/d{variable}²</button>
          <button style={buttonStyle} onClick={() => handleThirdDifferentiation(variable)}>d³/d{variable}³</button>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={handleIndefiniteIntegration}>∫ dx</button>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={handleDoubleIntegration}>∫∫ dx dy</button>
          <button style={buttonStyle} onClick={handleTripleIntegration}>∫∫∫ dx dy dz</button>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={handleSimplify}>Simplify</button>
        </div>
        <h2 style={resultStyle}>Result: {result}</h2>
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0f4f7",
  fontFamily: "Arial, sans-serif",
};

const headerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#007bff",
  padding: "20px 0",
};

const headerStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#fff",
  margin: 0,
};

const calculatorStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "300px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "18px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginBottom: "20px",
  boxSizing: "border-box",
};

const variableInputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "18px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  boxSizing: "border-box",
};

const buttonContainerStyle = {
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  margin: "5px",
  transition: "background-color 0.3s ease",
};

const resultStyle = {
  marginTop: "20px",
  color: "#007bff",
  fontSize: "1.5rem",
};

export default Calculator;
