import React from 'react'
const Loading = () => {
    return (
        <React.Fragment>
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <div className="vh-50 d-flex align-items-center justify-content-center">
                        <div className="spinner-border text-primary" role="status" style={{width:'3rem', height:'3rem'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Loading
