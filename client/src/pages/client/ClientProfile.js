import React, { useEffect, useState } from 'react'
import { Lock, Rss } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AuthUserAction, ProfileUpdateAction } from '../../redux/actions/AuthAction';
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/AuthConstant';
import MetaData from '../../components/MetaData';

const ClientProfile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);
    const { loading, isUpdated, message } = useSelector((state) => state.profile);
    const [image, setImage] = useState();
    const [data, setData] = useState({
        name: user?.name,
        email: user?.email,
    })

    const InpChnage = (event) => {
        if (event.target.name === "image") {
            setImage(event.target.files[0]);
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    const UpdateProfile = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("image", image);
        await dispatch(ProfileUpdateAction(formData))

    }


    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: UPDATE_PROFILE_RESET })
            dispatch(AuthUserAction());
        }
    }, [dispatch, isUpdated, message])
    return (
        <div className="content-wrapper">
            <MetaData title="Client - Profile" />
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
                                                        <Link className="nav-link font-weight-bold active" to={'/client/profile'}>
                                                            <span className="d-none d-md-block">Profile</span>
                                                            <Rss className="d-block d-md-none" />
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link font-weight-bold" to={'/client/password'}>
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
                                        <form method="post" onSubmit={UpdateProfile}>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Name</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={data.name} name='name' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={data.email} name='email' required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label>Profile pic</label>
                                                        <div className="custom-file">
                                                            <input type="file" className="custom-file-input" id="image" onChange={InpChnage} name='image' />
                                                            <label className="custom-file-label" htmlFor="image">Choose profile pic</label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>




                                            <div className="row">
                                                <div className="col">
                                                    <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Updating...' : 'Update Profile'}</button>
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

export default ClientProfile
