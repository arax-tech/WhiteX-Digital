import React, { useEffect, useState } from 'react'
import MetaData from "../../components/MetaData";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { OtpVerifyAction, SettingAction } from '../../redux/actions/AuthAction';
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant';
import { Lock } from 'react-feather';


const Verify = () => {

    const dispatch = useDispatch()

    const { loading, setting, status, message, isAuthenticated, user, token } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');

    useEffect(() => {
        dispatch(SettingAction())
    }, [dispatch]);

    const OTPSubmit = (event) => {
        event.preventDefault();
        dispatch(OtpVerifyAction(otp));
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

        if (status && status === 202) {
            toast.success(message, { theme: "colored" });
            localStorage.setItem("role", user?.role?.toLowerCase());
            localStorage.setItem("token", token);
            window.location.href = redirect;;
        }

        if (isAuthenticated && isAuthenticated === true) {
            window.location.href = redirect;
        }

    }, [dispatch, status, message, token, user, isAuthenticated, redirect])

    return (
        <div className="auth-wrapper auth-v2">
            <MetaData title={'OTP Verification'} />
            <div className="auth-inner row m-0">
                <Link className="brand-logo" to="#">

                    <img src={setting?.menu_logo} alt={setting?.company_name} />
                </Link>

                <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5"><img className="img-fluid" src="../../../app-assets/images/pages/login-v2.svg" alt="Login V2" /></div>
                </div>

                <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">

                        <h1 className="brand-text text-primary text-center mb-3">OTP Verification</h1>
                        <p className="card-text mb-2">Please check you email we have send you OTP there...</p>
                        <form onSubmit={OTPSubmit} method="POST">
                            <div className="form-group">
                                <label className="form-label">OTP</label>
                                <div class="input-group input-group-merge">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><Lock className='feather-icon-size' /></span>
                                    </div>
                                    <input placeholder='Enter OTP' className="form-control" onChange={(event) => setOtp(event.target.value)} value={otp} autoFocus type="number" name="otp" required />
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block" disabled={loading}> {loading ? 'Verifying...' : 'Verify'}</button>
                        </form>
                        {/* <p className="text-center mt-2"><span>New on our platform?</span><a href="page-auth-register-v2.html"><span>&nbsp;Create an account</span></a></p> */}


                    </div>
                </div>

            </div>
        </div>

    )
}

export default Verify
