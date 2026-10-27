import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable"
import { Eye, EyeOff, Upload, User, Lock, Mail } from "lucide-react";

const SearchInputFields = ({
  type = "text",
  label,
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
  style,
  onKeyDown,
  required,
  accept,
}) => {
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

  switch (type) {
    case "textarea":
      return (
        <div className="mb-0">
          {label && <label className="form-label">{label}</label>}
          <textarea
            className={`form-control ${error ? "is-invalid" : ""}`}
            style={style ? style : { height: "100px", flexShrink: 0 }}
            name={name}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      );

    case "textarea-search":
      return (
        <div className="mb-0">
          {label && <label className="form-label">{label}</label>}

          <CreatableSelect
            name={name}
            isClearable
            placeholder={placeholder || "Type or search..."}
            value={value ? { label: value, value } : null}
            onChange={(selected) =>
              onChange({
                target: {
                  name,
                  value: selected?.value || "",
                },
              })
            }
            options={options.map((opt) => ({
              label: opt,
              value: opt,
            }))}
            className={error ? "is-invalid" : ""}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),

              control: (base) => ({
                ...base,
                minHeight: "80px",          // textarea height
                alignItems: "flex-start",   // top align
              }),

              valueContainer: (base) => ({
                ...base,
                alignItems: "flex-start",
                paddingTop: "8px",
              }),

              input: (base) => ({
                ...base,
                margin: 0,
                padding: 0,
              }),

              placeholder: (base) => ({
                ...base,
                marginTop: 0,
              }),
            }}
          />

          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
      );

    case "radio":
      return (
        <div className="mb-0 form-check">
          <input
            type={type}
            className={`form-check-input ${error ? "is-invalid" : ""}`}
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
          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
      );

    case "select":
      return (
        <div className="mb-0">
          {label && <label className="form-label">{label}</label>}
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
            className={error ? "is-invalid" : ""}
            onKeyDown={onKeyDown}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            menuPlacement="auto"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
          {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
      );

    case "file":
      return (
        <div className="mb-0">
          {label && (
            <label className="form-label">
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
          <div className="input-group">
            {/* <span className="input-group-text">
              <Upload size={16} />
            </span> */}
            <input
              type="file"
              className={`form-control ${error ? "is-invalid" : ""}`}
              name={name}
              accept={accept}
              onChange={onChange}
              multiple={multiple}
              required={required}
            />
          </div>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      );

    default: // text, email, number, date, etc.
      return (
        <div className="mb-0">
          {label && <label className="form-label">{label}</label>}
          <div className="input-group">
            <input
              type={type}
              className={`form-control ${error ? "is-invalid" : ""}`}
              style={style ? style : { height: "38px", flexShrink: 0 }}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
            />
          </div>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      );
  }
};

export default SearchInputFields;
