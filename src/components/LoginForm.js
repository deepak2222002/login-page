// src/components/LoginForm.jsx
import React, { useState } from "react";
import InputField from "../components/InputFields";

const LoginForm = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(employeeId, password);
    } catch (err) {
      setError("Invalid username or password");
    }
  };


  return (
    <div className="card shadow-lg rounded-4 p-4" style={{ width: "380px" }}>
      <h2 className="text-center mb-4 fw-bold">Login</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <InputField
          type="text"
          placeholder="Username"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        {/* Password */}
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

         {/* Show Password */}
        <InputField
          type="checkbox"
          label="Show Password"
          onChange={(e) => setShowPassword(!showPassword)}
        />

        {/* Login Button */}
        <button type="submit" className="btn btn-primary w-100 fw-bold mt-2">
          Login
        </button>
      </form>

    </div>
  );
};

export default LoginForm;
