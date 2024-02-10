import React, { useEffect } from 'react'
import Header from './include/Header';
import SideBar from './include/SideBar';
import Footer from './include/Footer';
import { Outlet, useLocation } from 'react-router-dom';
const ClientLayout = ({ children }) => {
    

    return (
        <React.Fragment>
            {/* BEGIN: Header */}
            <Header />
            {/* END: Header */}

            {/* BEGIN: Main Menu */}
            <SideBar />
            {/* END: Main Menu */}
            <div className="app-content content " style={{ minHeight: '91vh' }}>
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <Outlet/>

            </div>

            <div className="sidenav-overlay"></div>
            <div className="drag-target"></div>

            {/* BEGIN: Footer */}
            <Footer />
            {/* END: Footer */}
        </React.Fragment>
    )
}

export default ClientLayout
