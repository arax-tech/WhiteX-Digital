import React, { useEffect, useState } from 'react'
import MetaData from "../../components/MetaData";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { LoginAction } from '../../redux/actions/AuthAction';
import { Eye, EyeOff } from 'react-feather';
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant';


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, status, message, isAuthenticated, user } = useSelector((state) => state.auth);
    const [passwordToggke, setPasswordToggke] = useState(false);

    const [login, setLogin] = useState({
        email: "",
        password: ""
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

    useEffect(() => {

        if (status && status === 401) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: CLEAR_ERRORS });
        }

        if (status && status === 200) {
            toast.success(message, { theme: "colored" });
            navigate('/verify')
        }

        if (isAuthenticated && isAuthenticated === true) {
            navigate(redirect)
        }



    }, [dispatch, navigate, status, message, isAuthenticated, redirect])
    return (
        <div className="app-content content ">
            <MetaData title={'Login'} />
            <div className="content-overlay"></div>
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


                                    <h4 className="card-title mb-1">Welcome to Back! {isAuthenticated} 👋</h4>
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
                                                {
                                                    passwordToggke === false ?
                                                        <input className="form-control form-control-merge" type="password" name="password" onChange={inpChnage} value={login.password} required />
                                                        :
                                                        <input className="form-control form-control-merge" type="text" name="password" onChange={inpChnage} value={login.password} required />
                                                }
                                                <div onClick={() => setPasswordToggke(!passwordToggke)} className="input-group-append"><span className="input-group-text cursor-pointer">
                                                    {
                                                        passwordToggke === false ?
                                                            <Eye style={{ width: 14, height: 14 }} />
                                                            :
                                                            <EyeOff style={{ width: 14, height: 14 }} />
                                                    }
                                                </span></div>


                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input className="custom-control-input" id="remember-me" type="checkbox" />
                                                <label className="custom-control-label" htmlFor="remember-me"> Remember Me</label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" disabled={loading}> {loading ? 'Signing In...' : 'Sign In'}</button>
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
