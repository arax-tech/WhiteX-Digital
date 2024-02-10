import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AlertTriangle, DollarSign, Gift, HelpCircle, Home, Lock, Menu, Power, ShoppingBag, Star, User } from 'react-feather';
import { AuthLogoutAction } from '../../../../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UncombineClientPermissions } from '../../Permissions';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SideBar = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { user, menus, setting } = useSelector((state) => state.auth);

    const IsActive = location.pathname;
    const AuthLogoutFunction = () => {
        dispatch(AuthLogoutAction());
        toast.success("Logout Successfully...", { theme: "colored" });
    }

    const allPermissions = UncombineClientPermissions(user.permissions);


    return (
        <React.Fragment>
            <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item mr-auto">
                            <Link className="navbar-brand" to="/client/dashboard">
                                <span className="brand-logo">
                                </span>
                                <h2 className="brand-text">
                                    <img style={{ width: '100%', height: '40px' }} src={setting?.menu_logo} alt={setting?.company_name} />
                                </h2>
                            </Link>
                        </li>
                        <li className="nav-item nav-toggle"><Link className="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i className="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i><i className="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i></Link></li>
                    </ul>
                </div>
                <div className="shadow-bottom"></div>
                <div className="main-menu-content">

                    <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">

                        <li className=" navigation-header"><span>Main</span><i data-feather="more-horizontal"></i></li>



                        <li className={IsActive === "/client/dashboard" ? ' nav-item active' : ' nav-item'}>
                            <Link to="/client/dashboard" className="d-flex align-items-center"><Home /><span className="menu-title text-truncate">Dashboard</span></Link>
                        </li>



                        {
                            allPermissions.ReadTeam && (
                                <li className={IsActive === "/client/team" ? ' nav-item active' : ' nav-item'}>
                                    <Link to="/client/team" className="d-flex align-items-center"><User /><span className="menu-title text-truncate">Teams</span></Link>
                                </li>
                            )
                        }

                        {
                            allPermissions.ReadSubscription && (
                                <li className={IsActive === "/client/subscription" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/client/subscription"><Gift /><span className="menu-title text-truncate">Subscription</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions.ReadCancellationRequests && (
                                <li className={IsActive === "/client/subscription/cancellation" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/client/subscription/cancellation"><AlertTriangle /><span className="menu-title text-truncate">Cancellation Requests</span></Link>
                                </li>
                            )
                        }




                        {
                            allPermissions.ReadBillingInformation || (allPermissions.ReadInvoiceManagement && (
                                <li className=" navigation-header"><span>Invoices</span><i data-feather="more-horizontal"></i></li>
                            ))
                        }

                        {
                            allPermissions.ReadBillingInformation && (
                                <li className={IsActive === "/client/billing/information" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/client/billing/information"><DollarSign /><span className="menu-title text-truncate">Billing Information</span></Link>
                                </li>
                            )
                        }

                        {
                            allPermissions.ReadInvoiceManagement && (
                                <li className={IsActive === "/client/invoice/management" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/client/invoice/management"><ShoppingBag /><span className="menu-title text-truncate">Invoice Management</span></Link>
                                </li>
                            )
                        }




                        <li className=" navigation-header"><span>Setting</span><i data-feather="more-horizontal"></i></li>

                        <li className={IsActive === "/client/profile" ? ' nav-item active' : ' nav-item'}>
                            <Link className="d-flex align-items-center" to="/client/profile"><User /><span className="menu-title text-truncate">Profile</span></Link>
                        </li>
                        <li className={IsActive === "/client/password" ? ' nav-item active' : ' nav-item'}>
                            <Link className="d-flex align-items-center" to="/client/password"><Lock /><span className="menu-title text-truncate">Update Password</span></Link>
                        </li>
                        <li className='nav-item'>
                            <Link onClick={AuthLogoutFunction} className="d-flex align-items-center" to="#"><Power /><span className="menu-title text-truncate">Logout</span></Link>
                        </li>



                        {
                            (allPermissions.ReadPopUpMessages || allPermissions.ReadLeadTracking || allPermissions.ReadSupportTicket || allPermissions.ReadFeedBack || allPermissions.ReadCustomMenu) && (
                                <li className=" navigation-header"><span>Other</span><i data-feather="more-horizontal"></i></li>
                            )
                        }



                        {
                            allPermissions.ReadSupportTicket && (
                                <li className={IsActive === "/client/support/ticket" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/client/support/ticket"><HelpCircle /><span className="menu-title text-truncate">Support Ticket</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions.ReadFeedBack && (
                                <li className={IsActive === "/client/feedback" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/client/feedback"><Star /><span className="menu-title text-truncate">Feedback</span></Link>
                                </li>
                            )
                        }





                        {
                            menus?.length > 0 && (
                                <>
                                    <li className=" navigation-header"><span>Custom Solutions</span><i data-feather="more-horizontal"></i></li>
                                    {
                                        menus?.map((menu, index) => (
                                            <OverlayTrigger
                                                key={index}
                                                placement="top"
                                                elay={{ show: 10, hide: 10 }}
                                                offset={[-20, -8]}
                                                overlay={(props) => (
                                                    <Tooltip id="button-tooltip" {...props}>
                                                        <span>{menu?.tooltip}</span>
                                                    </Tooltip>
                                                )}
                                            >
                                                <li className='nav-item'>
                                                    {
                                                        menu?.status === "Active" ? (
                                                            <Link target='_blank' to={menu.link} className="d-flex align-items-center" >
                                                                <Menu />
                                                                <span className="menu-title text-truncate">{menu?.name}</span>
                                                            </Link>
                                                        ) : (
                                                            <Link onClick={(event) => event.preventDefault()} to={'#'} className="d-flex align-items-center" style={{ color: 'gray' }}>
                                                                <Menu style={{ color: 'gray' }} />
                                                                <span className="menu-title text-truncate" style={{ color: '#676D7D' }}>{menu.name}</span>
                                                            </Link>
                                                        )
                                                    }

                                                </li>
                                            </OverlayTrigger>
                                        ))
                                    }
                                </>

                            )
                        }


                        <li className='nav-item mt-3 mb-3 '></li>

                    </ul>
                </div>
            </div>

        </React.Fragment>
    )
}

export default SideBar
