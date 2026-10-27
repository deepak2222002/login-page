import React from 'react'

function InformationModal(props) {

    const showAlert = () => {
        props.showDisMissAlert("Alert ready to show.", "success");

        setTimeout(() => {
            props.setDismissAlertNull();
        }, 2000);
    }

    return (
        <>
            <div className='container my-3'>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch modal
                </button>
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.headingAndMessage.heading}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.headingAndMessage.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={showAlert}>Show Alert</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationModal
