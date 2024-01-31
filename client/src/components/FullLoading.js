import React from 'react'
import './Loader.css';
const FullLoading = () => {
    return (
        <React.Fragment>
            <div className="loader-overlay">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FullLoading
