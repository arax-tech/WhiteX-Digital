import React, { useEffect, useState } from 'react'
import { Lock, Rss } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant';
import { PasswordUpdateAction } from '../../redux/actions/AuthAction';
import MetaData from '../../components/MetaData';

const ClientPassword = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);
    const { loading, isUpdated, message, status } = useSelector((state) => state.profile);

    const [password, setPassword] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const inpChnage = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }

    const UpdatePassword = (event) => {
        event.preventDefault();

        if (password.new_password === password.confirm_password) {
            dispatch(PasswordUpdateAction(password.current_password, password.new_password))
        } else {
            toast.error("Password confirmation does not match...", { theme: "colored" })
        }


    }


    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: CLEAR_ERRORS })
            setPassword({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });

        }

        if (status && status === 400) {
            toast.error(message, { theme: "colored" })
            dispatch({ type: CLEAR_ERRORS })
        }
    }, [dispatch, isUpdated, message, status])
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Password" />
            <div className="content-header row">
            </div>
            <div className="content-body">
                <div id="user-profile">

                    <div className="row">
                        <div className="col-12">
                            <div className="card profile-header mb-2">

                                <img className="card-img-top" src="/app-assets/images/profile/user-uploads/timeline.jpg" alt={user?.name} />


                                <div className="position-relative">

                                    <div className="profile-img-container d-flex align-items-center">
                                        <div className="profile-img">
                                            <img src={user?.image?.length > 0 ? user?.image : "/placeholder.jpg"} className="rounded img-fluid" alt={user?.name} />
                                        </div>

                                        <div className="profile-title ml-3">
                                            <h2 className="text-white">{user?.name}</h2>
                                            <p className="text-success">Online</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="profile-header-nav">

                                    <nav className="navbar navbar-expand-md navbar-light justify-content-end justify-content-md-between w-100">
                                        <button className="btn btn-icon navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <i data-feather="align-justify" className="font-medium-5"></i>
                                        </button>


                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
                                                <ul className="nav nav-pills mb-0">
                                                    <li className="nav-item">
                                                        <Link className="nav-link font-weight-bold" to={'/client/profile'}>
                                                            <span className="d-none d-md-block">Profile</span>
                                                            <Rss className="d-block d-md-none" />
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link font-weight-bold active" to={'/client/password'}>
                                                            <span className="d-none d-md-block">Update Password</span>
                                                            <Lock className="d-block d-md-none" />
                                                        </Link>
                                                    </li>

                                                </ul>


                                                <Link to='/admin/dashboard' className="btn btn-primary">
                                                    <span className="font-weight-bold d-none d-md-block">Back</span>
                                                </Link>
                                            </div>
                                        </div>

                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>



                    <section id="profile-info">
                        <div className="row">

                            <div className="col-lg-12 col-12">

                                <div className="card">
                                    <div className="card-body">
                                        <form method="post" onSubmit={UpdatePassword}>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Current Password</label>
                                                        <input type="text" className="form-control" onChange={inpChnage} name='current_password' value={password.current_password} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">New Password</label>
                                                        <input type="text" className="form-control" onChange={inpChnage} name='new_password' value={password.new_password} required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Confirm Password</label>
                                                        <input type="text" className="form-control" onChange={inpChnage} name='confirm_password' value={password.confirm_password} required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Updating...' : 'Update Password'}</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                            </div>



                        </div>




                    </section>

                </div>

            </div>
        </div>
    )
}

export default ClientPassword
