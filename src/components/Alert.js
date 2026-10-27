import React from 'react'

function Alert(props) {
    return (
        props.alert && <div className='container my-3' style={{ height: '100px' }}>
            <div class={`alert alert-${props.alert == null ? 'warning' : props.alert.type} alert-dismissible fade show`} role="alert">
                {props.alert == null ? 'Default Message.' : props.alert.message}
            </div>
        </div>

    )
}

export default Alert
