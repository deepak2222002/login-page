import React from 'react'

function UploadLoadingSpinner(props) {
    return (
        <div className="d-flex justify-content-center align-items-center bg-light" style={{height: "50vh"}}>
          <div className="text-center">
            <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-3 fw-semibold text-secondary">{props.message}</div>
          </div>
        </div>

    )
}

export default UploadLoadingSpinner
