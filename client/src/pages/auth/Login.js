import React, { useEffect, useState } from 'react'
import MetaData from "../../components/MetaData";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { LoginAction, clearErrors } from '../../redux/actions/AuthAction';
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant';


const Login = () => {

    const dispatch = useDispatch()

    const { loading, status, message, isAuthenticated, user, token } = useSelector((state) => state.auth);
    const [login, setLogin] = useState({
        email: "arham@info.com",
        password: "11"
    })

    const inpChnage = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value })
    }

    const LoginSubmit = (event) => {
        event.preventDefault();
        dispatch(LoginAction(login.email, login.password));
    }

    let redirect = "";
    if (user && user.role === "Admin") {
        redirect = "/admin/dashboard";
    } else {
        redirect = "/client/dashboard";
    }

    // useEffect(() => {

    //     if (status && status === 401) {
    //         toast.error(message, { theme: "colored" });
    //         dispatch({ type: CLEAR_ERRORS })
    //     }

    //     if (status && status === 200) {
    //         localStorage.setItem("role", user?.role.toLowerCase());
    //         localStorage.setItem("token", token);

    //         toast.success(message, { theme: "colored" });
    //         window.location.href = redirect;
    //     }


    //     if (isAuthenticated === true) {
    //         window.location.href = redirect;
    //     }

    // }, [dispatch, status, message, user, isAuthenticated, redirect, token])
    return (
        <div className="app-content content ">
            <MetaData title={'Login'} /> <div className="content-overlay"></div>
            <div className="header-navbar-shadow"></div>
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <div className="auth-wrapper auth-v2">
                        <div className="auth-inner row m-0">
                            <Link className="brand-logo" to="#">
                                <h2 className="brand-text text-primary ml-1">Login</h2>
                            </Link>

                            <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                                <div className="w-100 d-lg-flex align-items-center justify-content-center px-5"><img className="img-fluid" src="../../../app-assets/images/pages/login-v2.svg" alt="Login V2" /></div>
                            </div>

                            <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                                <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                                    <h4 className="card-title mb-1">Welcome to Back! 👋</h4>
                                    <p className="card-text mb-2">Please sign-in to your account and start the adventure</p>
                                    <form className="auth-login-form mt-2" onSubmit={LoginSubmit} method="POST">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" onChange={inpChnage} value={login.email} autoFocus type="text" name="email" required />
                                        </div>
                                        <div className="form-group">
                                            <div className="d-flex justify-content-between">
                                                <label>Password</label><Link to="/forgot/password"><small>Forgot Password?</small></Link>
                                            </div>
                                            <div className="input-group input-group-merge form-password-toggle">
                                                <input className="form-control form-control-merge" type="password" name="password" onChange={inpChnage} value={login.password} required />
                                                <div className="input-group-append"><span className="input-group-text cursor-pointer"><i data-feather="eye"></i></span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input className="custom-control-input" id="remember-me" type="checkbox" />
                                                <label className="custom-control-label" htmlFor="remember-me"> Remember Me</label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block">Sign in</button>
                                    </form>
                                    {/* <p className="text-center mt-2"><span>New on our platform?</span><a href="page-auth-register-v2.html"><span>&nbsp;Create an account</span></a></p> */}


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
