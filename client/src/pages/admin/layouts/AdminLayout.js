import React, { useEffect } from 'react'
import Header from './include/Header';
import SideBar from './include/SideBar';
import Footer from './include/Footer';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
    // useEffect(() => {
    //     const script1 = document.createElement('script');
    //     script1.src = "/app-assets/vendors/js/vendors.min.js";
    //     script1.async = true;
    //     document.body.appendChild(script1);

        

    //     const script3 = document.createElement('script');
    //     script3.src = "/app-assets/js/core/app.js";
    //     script3.async = true;
    //     document.body.appendChild(script3);

       
    //     const script5 = document.createElement('script');
    //     script5.src = "/app-assets/js/scripts/pages/dashboard-ecommerce.js";
    //     script5.async = true;
    //     document.body.appendChild(script5);
        
    //     // const script6 = document.createElement('script');
    //     // script6.src = "/app-assets/js/scripts/pages/app-chat.js";
    //     // script6.async = true;
    //     // document.body.appendChild(script6);

    //     return () => {
    //         document.body.removeChild(script1);
    //         // document.body.removeChild(script2);
    //         document.body.removeChild(script3);
    //         // document.body.removeChild(script4);
    //         document.body.removeChild(script5);
    //         // document.body.removeChild(script6);
    //     };
    // }, []);

    return (
        <React.Fragment>
            {/* BEGIN: Header */}
            <Header />
            {/* END: Header */}

            {/* BEGIN: Main Menu */}
            <SideBar />
            {/* END: Main Menu */}
            <div className="app-content content  email-application" style={{ minHeight: '91vh' }}>
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <Outlet />

            </div>

            <div className="sidenav-overlay"></div>
            <div className="drag-target"></div>

            {/* BEGIN: Footer */}
            <Footer />
            {/* END: Footer */}

        </React.Fragment>
    )
}

export default AdminLayout
