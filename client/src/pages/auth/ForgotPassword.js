import React, { useEffect, useState } from 'react'
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail } from 'react-feather';
import { ForgotPasswordAction, SettingAction } from '../../redux/actions/AuthAction';
import { toast } from 'react-toastify';
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant';


const ForgotPassword = () => {

    const dispatch = useDispatch()

    const { loading, status, message } = useSelector((state) => state.password);

    const { setting } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(SettingAction())
    }, [dispatch]);

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
        <div className="auth-wrapper auth-v2">
            <MetaData title={'Forgot Password'} />
            <div className="auth-inner row m-0">
                <Link className="brand-logo" to="#">

                    <img src={setting?.menu_logo} alt={setting?.company_name} />
                </Link>

                <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5"><img className="img-fluid" src="../../../app-assets/images/pages/login-v2.svg" alt="Login V2" /></div>
                </div>

                <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">

                        <h1 className="brand-text text-primary text-center mb-3">Forgot Password? 🔒</h1>
                        <p className="card-text mb-2">Enter your email and we'll send you instructions to reset your password</p>
                        <form onSubmit={ForgotPasswordFunction} method="POST">
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div class="input-group input-group-merge">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><Mail className='input-feather-icon-size' /></span>
                                    </div>
                                    <input placeholder='Email' name='email' className="form-control" onChange={(event) => setEmail(event.target.value)} value={email} autoFocus type="email" required />
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block" disabled={loading}> {loading ? 'Verifying...' : 'Send Reset Link'}</button>
                        </form>

                        <div class="text-center">
                            <Link to="/login" class="d-flex align-items-center justify-content-center mt-1">
                                <ChevronLeft className='feather-icon-size' />&nbsp;&nbsp;Back to Login
                            </Link>
                        </div>


                    </div>
                </div>

            </div>
        </div>

    )
}

export default ForgotPassword
