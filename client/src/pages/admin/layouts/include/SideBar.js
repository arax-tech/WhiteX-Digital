import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AlertTriangle, CheckCircle, Circle, DollarSign, File, Gift, HelpCircle, Home, List, Lock, Mail, Menu, MessageCircle, PlayCircle, Power, Settings, ShoppingBag, ShoppingCart, Star, User, Users } from 'react-feather';
import { AuthLogoutAction } from '../../../../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../../Permissions';
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

    const allPermissions = UncombineAdminPermissions(user?.permissions);
    return (
        <React.Fragment>
            <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item mr-auto">
                            <Link className="navbar-brand" to="/admin/dashboard">
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



                        <li className={IsActive === "/admin/dashboard" ? ' nav-item active' : ' nav-item'}>
                            <Link to="/admin/dashboard" className="d-flex align-items-center"><Home /><span className="menu-title text-truncate">Dashboard</span></Link>
                        </li>
                        {
                            allPermissions?.ReadAdmin && (
                                <li className={IsActive === "/admin/admin" ? ' nav-item active' : ' nav-item'}>
                                    <Link to="/admin/admin" className="d-flex align-items-center"><User /><span className="menu-title text-truncate">Admins</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions?.ReadClient && (
                                <li className={IsActive === "/admin/client" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/client"><Users /><span className="menu-title text-truncate">Clients</span></Link>
                                </li>
                            )
                        }


                        <li class={`nav-item has-sub ${IsActive === "/admin/subscription" && 'sidebar-group-active open'} ${IsActive === "/admin/subscription/cancellation" && 'sidebar-group-active open'}`}>
                            <a class="d-flex align-items-center" href="#"><File />
                                <span class="menu-title text-truncate">Subscriptions</span>
                            </a>
                            <ul class="menu-content">
                                {
                                    allPermissions?.ReadSubscription && (
                                        <li className={IsActive === "/admin/subscription" ? ' nav-item active' : ' nav-item'}>
                                            <Link className="d-flex align-items-center" to="/admin/subscription"><Circle className='feather-icon-size-small' /><span className="menu-title text-truncate">Subscription</span></Link>
                                        </li>
                                    )
                                }
                                {
                                    allPermissions?.ReadCancellationRequests && (
                                        <li className={IsActive === "/admin/subscription/cancellation" ? ' nav-item active' : ' nav-item'}>
                                            <Link className="d-flex align-items-center" to="/admin/subscription/cancellation"><Circle className='feather-icon-size-small' /><span className="menu-title text-truncate">Cancellation Requests</span></Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </li>

                        <li className={IsActive === "/admin/mail" ? ' nav-item active' : ' nav-item'}>
                            <Link className="d-flex align-items-center" to="/admin/mail"><Mail /><span className="menu-title text-truncate">Mails</span></Link>
                        </li>
                        {/* {
                            allPermissions?.ReadSubscription && (
                                <li className={IsActive === "/admin/subscription" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/subscription"><Gift /><span className="menu-title text-truncate">Subscription</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions?.ReadCancellationRequests && (
                                <li className={IsActive === "/admin/subscription/cancellation" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/subscription/cancellation"><AlertTriangle /><span className="menu-title text-truncate">Cancellation Requests</span></Link>
                                </li>
                            )
                        } */}




                        {
                            allPermissions?.ReadBillingInformation || (allPermissions?.ReadInvoiceManagement && (
                                <li className=" navigation-header"><span>Invoices</span><i data-feather="more-horizontal"></i></li>
                            ))
                        }

                        {
                            allPermissions?.ReadBillingInformation && (
                                <li className={IsActive === "/admin/billing/information" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/billing/information"><DollarSign /><span className="menu-title text-truncate">Billing Information</span></Link>
                                </li>
                            )
                        }

                        {
                            allPermissions?.ReadInvoiceManagement && (
                                <li className={IsActive === "/admin/invoice/management" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/invoice/management"><ShoppingBag /><span className="menu-title text-truncate">Invoice Management</span></Link>
                                </li>
                            )
                        }




                        <li className=" navigation-header"><span>Setting</span><i data-feather="more-horizontal"></i></li>

                        <li className={IsActive === "/admin/profile" ? ' nav-item active' : ' nav-item'}>
                            <Link className="d-flex align-items-center" to="/admin/profile"><User /><span className="menu-title text-truncate">Profile</span></Link>
                        </li>
                        {
                            allPermissions?.ReadSetting && (
                                <li className={IsActive === "/admin/setting" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/setting"><Settings /><span className="menu-title text-truncate">Setting</span></Link>
                                </li>
                            )
                        }
                        <li className={IsActive === "/admin/password" ? ' nav-item active' : ' nav-item'}>
                            <Link className="d-flex align-items-center" to="/admin/password"><Lock /><span className="menu-title text-truncate">Update Password</span></Link>
                        </li>
                        <li className='nav-item'>
                            <Link onClick={AuthLogoutFunction} className="d-flex align-items-center" to="#"><Power /><span className="menu-title text-truncate">Logout</span></Link>
                        </li>



                        {
                            (allPermissions?.ReadPopUpMessages || allPermissions?.ReadLeadTracking || allPermissions?.ReadSupportTicket || allPermissions?.ReadFeedBack || allPermissions?.ReadCustomMenu) && (
                                <li className=" navigation-header"><span>Other</span><i data-feather="more-horizontal"></i></li>
                            )
                        }


                        {
                            allPermissions?.ReadPopUpMessages && (
                                <li className={IsActive === "/admin/popup/messages" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/popup/messages"><MessageCircle /><span className="menu-title text-truncate">Pop-up Messages</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions?.ReadLeadTracking && (
                                <li className={IsActive === "/admin/leads" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/leads"><CheckCircle /><span className="menu-title text-truncate">Lead Tracking</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions?.ReadSupportTicket && (
                                <li className={IsActive === "/admin/support/ticket" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/support/ticket"><HelpCircle /><span className="menu-title text-truncate">Support Ticket</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions?.ReadFeedBack && (
                                <li className={IsActive === "/admin/feedback" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/feedback"><Star /><span className="menu-title text-truncate">Feedback</span></Link>
                                </li>
                            )
                        }
                        {
                            allPermissions?.ReadCustomMenu && (
                                <li className={IsActive === "/admin/custom/menu" ? ' nav-item active' : ' nav-item'}>
                                    <Link className="d-flex align-items-center" to="/admin/custom/menu"><List /><span className="menu-title text-truncate">Custom Menu</span></Link>
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
