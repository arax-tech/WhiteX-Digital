import React, { useEffect, useState } from 'react'
import { Image, Lock, Mail, MapPin, Phone, Rss, User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import MetaData from '../../components/MetaData';
import { UncombineAdminPermissions } from './Permissions';
// @ts-ignore
import { SettingUpdateAction } from '../../redux/actions/Admin/SettingAction';
import { AuthUserAction } from '../../redux/actions/AuthAction';
import { UPDATE_SETTING_RESET } from '../../redux/constants/Admin/SettingConstant';
const AdminSetting = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, isUpdated, message } = useSelector((state) => state.settings);
    const { user, setting } = useSelector((state) => state.auth);


    const allPermissions = UncombineAdminPermissions(user?.permissions);



    useEffect(() => {
        if (allPermissions && !allPermissions.ReadSetting) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);


    const [menuLogo, setMenuLogo] = useState();
    const [invoiceLogo, setInvoiceLogo] = useState();
    const [fevicon, setFevicon] = useState();
    const [data, setData] = useState({
        company_name: setting?.company_name,
        email: setting?.email,
        phone1: setting?.phone1,
        phone2: setting?.phone2,
        phone3: setting?.phone3,
        address_1: setting?.address_1,
        address_2: setting?.address_2,
    })

    const InpChnage = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const UpdateSetting = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("company_name", data.company_name);
        formData.append("email", data.email);
        formData.append("phone1", data.phone1);
        formData.append("phone2", data.phone2);
        formData.append("phone3", data.phone3);
        formData.append("address_1", data.address_1);
        formData.append("address_2", data.address_2);
        formData.append("menu_logo", menuLogo);
        formData.append("fevicon", fevicon);
        formData.append("invoice_logo", invoiceLogo);
        await dispatch(SettingUpdateAction(formData))

    }


    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: UPDATE_SETTING_RESET })
            dispatch(AuthUserAction());
        }
    }, [dispatch, isUpdated, message])
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Profile" />
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
                                                        <Link className="nav-link font-weight-bold" to={'/admin/profile'}>
                                                            <span className="d-none d-md-block">Profile</span>
                                                            <Rss className="d-block d-md-none" />
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link font-weight-bold" to={'/admin/password'}>
                                                            <span className="d-none d-md-block">Update Password</span>
                                                            <Lock className="d-block d-md-none" />
                                                        </Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link font-weight-bold active" to={'/admin/setting'}>
                                                            <span className="d-none d-md-block">Setting</span>
                                                            <Rss className="d-block d-md-none" />
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
                                        <form method="post" onSubmit={UpdateSetting}>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Company Name</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><User className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <input type="text" placeholder='Company' className="form-control" onChange={InpChnage} value={data.company_name} name='company_name' required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><Mail className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <input type="text" placeholder='Email' className="form-control" onChange={InpChnage} value={data.email} name='email' required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Phone1</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><Phone className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <input type="text" placeholder='Phone1' className="form-control" onChange={InpChnage} value={data.phone1} name='phone1' required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Phone2</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><Phone className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <input type="text" placeholder='Phone2' className="form-control" onChange={InpChnage} value={data.phone2} name='phone2' required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Phone3</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><Phone className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <input type="text" placeholder='Phone3' className="form-control" onChange={InpChnage} value={data.phone3} name='phone3' required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Address 1</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><MapPin className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <input type="text" placeholder='Address' className="form-control" onChange={InpChnage} value={data.address_1} name='address_1' required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Address 2</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><MapPin className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <input type="text" placeholder='Address' className="form-control" onChange={InpChnage} value={data.address_2} name='address_2' required />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label>Fevicon</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><Image className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" id="image" onChange={(event) => setFevicon(event.target.files[0])} />
                                                                <label className="custom-file-label" htmlFor="image">Choose Fevicon</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label>Menu Logo</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><Image className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" id="image" onChange={(event) => setMenuLogo(event.target.files[0])} />
                                                                <label className="custom-file-label" htmlFor="image">Choose Menu Logo</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label>Invoice Logo</label>
                                                        <div class="input-group input-group-merge">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><Image className='input-feather-icon-size' /></span>
                                                            </div>
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" id="image" onChange={(event) => setInvoiceLogo(event.target.files[0])} />
                                                                <label className="custom-file-label" htmlFor="image">Choose Invoice Logo</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>




                                            <div className="row">
                                                <div className="col">
                                                    <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Updating...' : 'Update'}</button>
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

export default AdminSetting
