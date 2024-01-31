import React, { useEffect, useState } from 'react'
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import { ForgotPasswordAction } from '../../redux/actions/AuthAction';
import { toast } from 'react-toastify';
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant';


const ForgotPassword = () => {

    const dispatch = useDispatch()

    const { loading, status, message } = useSelector((state) => state.password);


    const [email, setEmail] = useState(null);


    const ForgotPasswordFunction = async (event) => {
        event.preventDefault();
        await dispatch(ForgotPasswordAction(email));
    }

   

    useEffect(() => {
        if (status && status === 200) {
            toast.success(message, { theme: "colored" });
        }
        if (status && status === 422) {
            toast.error(message, { theme: "colored" });
        }
        dispatch({ type: CLEAR_ERRORS });

    }, [dispatch, message, status])
    return (
        <div className="app-content content ">
            <MetaData title={'Forgot Password'} />
            <div className="content-overlay"></div>
            <div className="header-navbar-shadow"></div>
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <div className="auth-wrapper auth-v2">
                        <div className="auth-inner row m-0">
                            <Link className="brand-logo" to="#">

                                <h2 className="brand-text text-primary ml-1">Forgot Password </h2>
                            </Link>

                            <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                                <div className="w-100 d-lg-flex align-items-center justify-content-center px-5"><img className="img-fluid" src="../../../app-assets/images/pages/login-v2.svg" alt="Login V2" /></div>
                            </div>

                            <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                                <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">


                                    <h4 className="card-title mb-1">Forgot Password? 🔒</h4>
                                    <p className="card-text mb-2">Enter your email and we'll send you instructions to reset your password</p>
                                    <form className="auth-login-form mt-2" onSubmit={ForgotPasswordFunction} method="POST">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input className="form-control" onChange={(event) => setEmail(event.target.value)} value={email} autoFocus type="text" name="email" required />
                                        </div>

                                        <button className="btn btn-primary btn-block" disabled={loading}> {loading ? 'Verifying...' : 'Send Reset Link'}</button>
                                    </form>

                                    <div class="text-center">
                                        <Link to="/login" class="d-flex align-items-center justify-content-center mt-1">
                                            <ChevronLeft/>
                                            Back to Login
                                        </Link>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword
