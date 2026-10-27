import React from 'react'

function ToolTips() {
    return (
        <button type="button" class="btn btn-primary"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables.">
            Custom tooltip
        </button>
    )
}

export default ToolTips
