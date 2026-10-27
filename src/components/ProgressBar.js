import React from 'react'

function ProgressBar() {
    return (
        <div className='container'>
            <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar text-bg-warning" style={{ width: '100%' }}>100%</div>
            </div>
        </div>
    )
}

export default ProgressBar
