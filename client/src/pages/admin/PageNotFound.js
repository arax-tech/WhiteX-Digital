import React from 'react'
import MetaData from '../../components/MetaData'

const PageNotFound = () => {
    return (
        <div className="content-wrapper">
            <MetaData title={'404 - Page Not Found'}/>
            <div className="content-header row">
            </div>
            <div className="content-body">
                <div className="misc-wrapper">
                    <div className="misc-inner p-2 p-sm-3">
                        <div className="w-100 text-center">
                            <h2 className="mb-1">Page Not Found 🕵🏻‍♀️</h2>
                            <p className="mb-2">Oops! 😖 The requested URL was not found on this server.</p>
                            <img className="img-fluid" src="/app-assets/images/pages/error.svg" alt="Error page" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
