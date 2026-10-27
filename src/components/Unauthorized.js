import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Unauthorized() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg border-0 text-center p-4" style={{ maxWidth: "500px" }}>
        
        {/* Lock Icon */}
        <div className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "100px", height: "100px", margin: "0 auto" }}>
          <i className="bi bi-lock-fill text-danger fs-1"></i>
        </div>

        {/* Title */}
        <h1 className="text-danger fw-bold">401 - Unauthorized</h1>

        {/* Subtitle */}
        <p className="text-muted mb-4">Oops! You don’t have permission to access this page.</p>

        {/* Back to Login Button */}
        <a href="/WebApplication/loginpage" className="btn btn-primary btn-lg shadow-sm">
          <i className="bi bi-box-arrow-in-right me-2"></i> Go to Login
        </a>

        {/* Extra Tip */}
        <p className="mt-3 text-secondary small fst-italic">
          If you believe this is a mistake, please contact the administrator.
        </p>
      </div>
    </div>
  );
}

export default Unauthorized;
