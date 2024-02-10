import React, { useEffect, useState } from 'react'
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, Lock } from 'react-feather';
import { ResetPasswordAction, SettingAction } from '../../redux/actions/AuthAction';
import { toast } from 'react-toastify';
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant';


const ResetPassword = () => {

    const dispatch = useDispatch()

    const { loading, status, message } = useSelector((state) => state.password);
    const { setting } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(SettingAction())
    }, [dispatch]);

    const { reset_token } = useParams();

    const [passwordToggke, setPasswordToggke] = useState(false);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);


    const ResetPasswordFunction = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password Confirmation does not matched...", { theme: "colored" });
        } else {
            await dispatch(ResetPasswordAction(reset_token, password));
        }
    }



    useEffect(() => {
        if (status && status === 200) {
            toast.success('Password Update Successfully...', { theme: "colored" });
        }
        if (status && status === 422) {
            toast.error('Invalid Password Reset Token...', { theme: "colored" });
        }
        dispatch({ type: CLEAR_ERRORS });

    }, [dispatch, message, status])
    return (
        <div className="auth-wrapper auth-v2">
            <MetaData title={'Reset Password'} />
            <div className="auth-inner row m-0">
                <Link className="brand-logo" to="#">
                    <img src={setting?.menu_logo} alt={setting?.company_name} />

                </Link>

                <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5"><img className="img-fluid" src="../../../app-assets/images/pages/login-v2.svg" alt="Login V2" /></div>
                </div>

                <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">

                        <h1 className="brand-text text-primary text-center mb-3">Reset Password 🔒</h1>
                        <p className="card-text mb-2">Your new password must be different from previously used passwords
                        </p>
                        <form onSubmit={ResetPasswordFunction} method="POST">

                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <div className="input-group input-group-merge form-password-toggle">
                                    <div class="input-group input-group-merge">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><Lock className='input-feather-icon-size' /></span>
                                        </div>

                                        <input type={passwordToggke ? 'text' : 'password'} placeholder='New Password' className="form-control form-control-merge" name="password" onChange={(event) => setPassword(event.target.value)} value={password} required />

                                        <div onClick={() => setPasswordToggke(!passwordToggke)} className="input-group-append">
                                            <span className="input-group-text cursor-pointer">
                                                {
                                                    passwordToggke === false ?
                                                        <Eye className='input-feather-icon-size' />
                                                        :
                                                        <EyeOff className='input-feather-icon-size' />
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <div className="input-group input-group-merge form-password-toggle">
                                    <div class="input-group input-group-merge">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><Lock className='input-feather-icon-size' /></span>
                                        </div>

                                        <input type={passwordToggke ? 'text' : 'password'} placeholder='Confirm Password' className="form-control form-control-merge" name="password" onChange={(event) => setConfirmPassword(event.target.value)} value={confirmPassword} required />

                                        <div onClick={() => setPasswordToggke(!passwordToggke)} className="input-group-append">
                                            <span className="input-group-text cursor-pointer">
                                                {
                                                    passwordToggke === false ?
                                                        <Eye className='input-feather-icon-size' />
                                                        :
                                                        <EyeOff className='input-feather-icon-size' />
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-block" disabled={loading}> {loading ? 'Updating...' : 'Update'}</button>
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

export default ResetPassword
