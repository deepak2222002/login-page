import React from "react";
import LoginForm from "../components/LoginForm";
import CompanyLogo from "../components/CompanyLogo";
import axios from "axios";
import { BriefcaseBusiness, Search, Users } from "lucide-react";
import backgroundImg from "../images/loginBackground.jpg";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LoginPage = () => {
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(BASE_URL +
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login success:", response.data);

      // Redirect after successful login
      window.location.replace("/auth/employeeDashboard");
    } catch (error) {
      console.error("Login failed:", error);

      const message =
        error.response?.data?.message ||
        "Invalid email or password. Please try again.";

      alert(message);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 0,
        }}
      ></div>

      {/* Login Card */}
      <div
        className="row shadow-lg rounded-4 overflow-hidden bg-white position-relative"
        style={{
          width: "90%",
          maxWidth: "950px",
          zIndex: 1,
          minHeight: "550px",
        }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div
          className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-white p-4 p-md-5"
          style={{
            background: "linear-gradient(135deg, #2563eb, #1e40af)",
          }}
        >
          {/* Icon */}
          <div
            className="d-flex align-items-center justify-content-center rounded-circle mb-4"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <BriefcaseBusiness size={42} />
          </div>

          {/* Heading */}
          <h2 className="fw-bold text-center mb-3">
            Find Your Next Opportunity
          </h2>

          {/* Description */}
          <p
            className="text-center mb-4"
            style={{
              maxWidth: "330px",
              lineHeight: "1.6",
              opacity: 0.9,
            }}
          >
            Discover jobs that match your skills, experience, and career
            goals. Build your profile and take the next step in your career.
          </p>

          {/* Features */}
          <div className="w-100" style={{ maxWidth: "300px" }}>
            <div className="d-flex align-items-center mb-3">
              <Search size={20} className="me-3" />
              <span>Find the right job</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <BriefcaseBusiness size={20} className="me-3" />
              <span>Apply to opportunities</span>
            </div>

            <div className="d-flex align-items-center">
              <Users size={20} className="me-3" />
              <span>Connect with employers</span>
            </div>
          </div>

          {/* Company / Portal Logo */}
          <div className="mt-4">
            <CompanyLogo size={300} />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-4 p-md-5">
          {/* Login Heading */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-2">
              Welcome Back
            </h2>

            <p className="text-muted mb-0">
              Sign in to continue to your account
            </p>
          </div>

          {/* Login Form */}
          <LoginForm onLogin={handleLogin} />

          {/* Forgot Password */}
          <div className="text-center mt-3">
            <a
              href="/forgot-password"
              className="text-decoration-none"
              style={{
                color: "#2563eb",
                fontSize: "0.9rem",
              }}
            >
              Forgot your password?
            </a>
          </div>

          {/* Signup */}
          <div className="text-center mt-4">
            <span className="text-muted" style={{ fontSize: "0.9rem" }}>
              Don't have an account?{" "}
            </span>

            <a
              href="/auth/createAccount"
              className="fw-semibold text-decoration-none"
              style={{
                color: "#2563eb",
              }}
            >
              Create an account
            </a>
          </div>

          {/* Recruiter Login */}
          <div
            className="text-center mt-4 pt-3 border-top"
          >
            <p
              className="text-muted mb-2"
              style={{ fontSize: "0.85rem" }}
            >
              Are you an employer?
            </p>

            <a
              href="/recruiter/login"
              className="text-decoration-none fw-semibold"
              style={{
                color: "#1e40af",
                fontSize: "0.9rem",
              }}
            >
              Recruiter / Employer Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;