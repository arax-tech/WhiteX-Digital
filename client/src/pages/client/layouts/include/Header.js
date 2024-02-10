import React, { useEffect, useState } from 'react'
import { AlertTriangle, Bell, Check, Lock, Menu, Moon, Power, Sun, User } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthLogoutAction } from '../../../../redux/actions/AuthAction';
import { toast } from 'react-toastify';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'vertical-layout vertical-menu-modern navbar-floating footer-static menu-expanded pace-done'
    );

    const toggleTheme = () => {
        const newTheme = theme === 'vertical-layout vertical-menu-modern navbar-floating footer-static menu-expanded pace-done'
            ? 'vertical-layout vertical-menu-modern navbar-floating footer-static menu-expanded pace-done dark-layout'
            : 'vertical-layout vertical-menu-modern navbar-floating footer-static menu-expanded pace-done';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const AuthLogoutFunction = () => {
        dispatch(AuthLogoutAction());
        toast.success("Logout Successfully...", { theme: "colored" });
    }
    return (
        <React.Fragment>
            <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow">
                <div className="navbar-container d-flex content">
                    <div className="bookmark-wrapper d-flex align-items-center">
                        <ul className="nav navbar-nav d-xl-none">
                            <li className="nav-item"><Link className="nav-link menu-toggle" to="#"><Menu className="ficon" /></Link></li>
                        </ul>



                    </div>
                    <ul className="nav navbar-nav align-items-center ml-auto">

                        <li className="nav-item d-none d-lg-block">
                            <Link onClick={toggleTheme} className="nav-link nav-link-style">
                                {theme ===
                                    'vertical-layout vertical-menu-modern navbar-floating footer-static menu-expanded pace-done' ? (
                                    <Moon className="ficon" />
                                ) : (
                                    <Sun className="ficon" />
                                )}
                            </Link>
                        </li>



                        {/* <li className="nav-item dropdown dropdown-notification mr-25">
                            <Link className="nav-link" to="#" data-toggle="dropdown">
                                <Bell className='ficon' />
                                <span className="badge badge-pill badge-danger badge-up">5</span>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                <li className="dropdown-menu-header">
                                    <div className="dropdown-header d-flex">
                                        <h4 className="notification-title mb-0 mr-auto">Notifications</h4>
                                        <div className="badge badge-pill badge-light-primary">6 New</div>
                                    </div>
                                </li>
                                <li className="scrollable-container media-list"><Link className="d-flex" to="#">
                                    <div className="media d-flex align-items-start">
                                        <div className="media-left">
                                            <div className="avatar"><img src="/app-assets/images/portrait/small/avatar-s-15.jpg" alt="avatar" width="32" height="32" /></div>
                                        </div>
                                        <div className="media-body">
                                            <p className="media-heading"><span className="font-weight-bolder">Congratulation Sam 🎉</span>winner!</p><small className="notification-text"> Won the monthly best seller badge.</small>
                                        </div>
                                    </div>
                                </Link><Link className="d-flex" to="#">
                                        <div className="media d-flex align-items-start">
                                            <div className="media-left">
                                                <div className="avatar"><img src="/app-assets/images/portrait/small/avatar-s-3.jpg" alt="avatar" width="32" height="32" /></div>
                                            </div>
                                            <div className="media-body">
                                                <p className="media-heading"><span className="font-weight-bolder">New message</span>&nbsp;received</p><small className="notification-text"> You have 10 unread messages</small>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className="d-flex" to="#">
                                        <div className="media d-flex align-items-start">
                                            <div className="media-left">
                                                <div className="avatar bg-light-danger">
                                                    <div className="avatar-content">MD</div>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p className="media-heading"><span className="font-weight-bolder">Revised Order 👋</span>&nbsp;checkout</p><small className="notification-text"> MD Inc. order updated</small>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link className="d-flex" to="#">
                                        <div className="media d-flex align-items-start">
                                            <div className="media-left">
                                                <div className="avatar bg-light-success">
                                                    <div className="avatar-content"><Check className="avatar-icon" /></div>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p className="media-heading"><span className="font-weight-bolder">Sales report</span>&nbsp;generated</p><small className="notification-text"> Last month sales report generated</small>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className="d-flex" to="#">
                                        <div className="media d-flex align-items-start">
                                            <div className="media-left">
                                                <div className="avatar bg-light-warning">
                                                    <div className="avatar-content"><AlertTriangle className="avatar-icon" /></div>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <p className="media-heading"><span className="font-weight-bolder">High memory</span>&nbsp;usage</p><small className="notification-text"> BLR Server using high memory</small>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="dropdown-menu-footer"><Link className="btn btn-primary btn-block" to="#">Read all notifications</Link></li>
                            </ul>
                        </li> */}
                        <li className="nav-item dropdown dropdown-user">
                            <Link className="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" to="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="user-nav d-sm-flex d-none">
                                    <span className="user-name font-weight-bolder">{user?.name}</span>
                                    <span className="user-status text-success">Online</span>
                                </div>
                                <span className="avatar">
                                    <img className="round" src={user?.image?.length > 0 ? user?.image : "/placeholder.jpg"} alt="avatar" height="40" width="40" />
                                    <span className="avatar-status-online"></span>
                                </span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
                                <Link className="dropdown-item" to="/client/profile">
                                    <User className="mr-50" /> Profile
                                </Link>
                                <Link className="dropdown-item" to="/client/password">
                                    <Lock className="mr-50" /> Password
                                </Link>
                                <Link className="dropdown-item" to="#" onClick={AuthLogoutFunction}>
                                    <Power className="mr-50" /> Logout
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header
