import React from "react";
import { useState } from "react";
import Select from "react-select";
import { Eye, EyeOff, Upload, User, Lock, Mail } from "lucide-react";

const InputField = ({
  type = "text",
  label,
  accept,
  name,
  value,
  onChange,
  placeholder,
  error,
  options = [],
  checked,
  multiple = false,
  showToggle = false,
  showPassword,
  setShowPassword,
  rows = 3,
  required = false,   // <-- new prop
  disabled = false
}) => {
  const [localError, setLocalError] = useState("");
  // Decide icon based on type
  const getIcon = () => {
    switch (type) {
      case "text":
        return <User size={18} />;
      case "email":
        return <Mail size={18} />;
      case "password":
        return <Lock size={18} />;
      default:
        return null;
    }
  };

  // utils/validation.js
  const isBlankOrSpaces = (value) => {
    if (value === null || value === undefined) return true;
    // convert non-string values safely
    const str = String(value);

    return str.trim().length === 0;
  };


  // 🔹 VALIDATION LOGIC (NEW)
  const handleBlur = () => {
    if (required && isBlankOrSpaces(value)) {
      setLocalError("This field is required");
    } else {
      setLocalError("");
    }
  };

  const hasError = error || localError;

  switch (type) {
    case "textarea":
      return (
        <div className="mb-1">
          {label && (
            <label className="form-label mb-0">
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
          <textarea
            className={`form-control ${hasError ? "is-invalid" : ""}`}
            onBlur={handleBlur}
            name={name}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
          />
          {hasError && <div className="invalid-feedback d-block">{hasError}</div>}
        </div>
      );

    case "select":
      return (
        <div className="mb-1">
          {label && <label className="form-label mb-0">{label}</label>}
          <Select
            name={name}
            options={options.map((opt) => ({ value: opt, label: opt }))}
            value={value ? { value, label: value } : null}
            onChange={(selected) =>
              onChange({
                target: { name, value: multiple ? selected.map((s) => s.value) : selected?.value },
              })
            }
            isMulti={multiple}
            placeholder={placeholder || "-- Select --"}
            onBlur={handleBlur}
            className={`${hasError ? "border border-danger" : ""}`}
          />
          {hasError && <div className="invalid-feedback d-block">{hasError}</div>}
        </div>
      );

    case "checkbox":
    case "radio":
      return (
        <div className="mb-1 form-check">
          <input
            type={type}
            className={`form-check-input ${hasError ? "is-invalid" : ""}`}
            id={name}
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
            required={required}
          />
          <label className="form-check-label" htmlFor={name}>
            {label} {required && <span className="text-danger">*</span>}
          </label>
          {hasError && <div className="invalid-feedback d-block">{hasError}</div>}
        </div>
      );

    case "file":
      return (
        <div className="mb-1">
          {label && (
            <label className="form-label mb-0">
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
          <div className="input-group">
            <span className="input-group-text">
              <Upload size={16} />
            </span>
            <input
              type="file"
              onBlur={handleBlur}
              className={`form-control ${hasError ? "border border-danger" : ""}`}
              name={name}
              accept={accept}
              onChange={onChange}
              multiple={multiple}
              required={required}
            />
          </div>
          {hasError && <div className="invalid-feedback d-block">{hasError}</div>}
        </div>
      );

    case "password":
      return (
        <div className="mb-1">
          {label && (
            <label className="form-label mb-0">
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
          <div className="input-group">
            <span className="input-group-text">{getIcon()}</span>
            <input
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              className={`form-control ${hasError ? "border border-danger" : ""}`}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
            />
            {showToggle && (
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            )}
          </div>
          {hasError && <div className="invalid-feedback d-block">{hasError}</div>}
        </div>
      );

    default: // text, email, number, date, etc.
      return (
        <div className="mb-1">
          {label && (
            <label className="form-label mb-0">
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
          <div className="input-group">
            {/* {getIcon() && <span className="input-group-text">{getIcon()}</span>} */}
            <input
              type={type}
              onBlur={handleBlur}
              className={`form-control ${hasError ? "border border-danger" : ""}`}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
            />
          </div>
          {hasError && <div className="invalid-feedback d-block">{hasError}</div>}
        </div>
      );
  }
};

export default InputField;
