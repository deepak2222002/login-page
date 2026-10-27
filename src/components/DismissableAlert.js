// DismissableAlert.js
import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import "../css/alertProgress.css";

function DismissableAlert({ alert, setDismissAlertNull }) {

  useEffect(() => {
    if (!alert) return;

    const timer = setTimeout(() => {
      setDismissAlertNull();
    }, 2000); // hide after 2 seconds

    return () => clearTimeout(timer);
  }, [alert, setDismissAlertNull]);

  if (!alert) return null;

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 2000 }}
    >
      <Alert
        variant={alert.type || "info"}
        dismissible
        onClose={setDismissAlertNull}
        className="shadow-lg alert-progress-container"
      >
        {alert.message}

        {/* Progress Line */}
        <div className="alert-progress-bar"></div>

      </Alert>
    </div>
  );
}

export default DismissableAlert;