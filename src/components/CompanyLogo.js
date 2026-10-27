// src/components/CompanyLogo.jsx
import React from "react";
import logo from "../images/companylogo.png"; // adjust path if needed

const CompanyLogo = ({ size = 200 }) => {
  return (
    <img
      src={logo}
      alt="Company Logo"
      className="img-fluid mb-3"
      style={{ maxWidth: `${size}px`, height: "auto" }}
    />
  );
};

export default CompanyLogo;
