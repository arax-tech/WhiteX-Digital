import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { CreateAdminAction } from '../../../redux/actions/Admin/AdminsAction';
import LoadingTable from '../../../components/LoadingTable'
import { toast } from 'react-toastify';
import { CLEAR_ERRORS, CREATE_ADMINS_RESET } from '../../../redux/constants/Admin/AdminsConstant';
import { AdminInitialPermissions } from '../Permissions';


const AdminAdminCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isCreated, status, message } = useSelector((state) => state.admins);


    const [image, setImage] = useState();
    const [data, setData] = useState({
        name: '',
        email: '',
        designation: '',
    })








    const InpChnage = (event) => {
        if (event.target.name === "image") {
            setImage(event.target.files[0]);
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }






    const [permissions, setPermissions] = useState(AdminInitialPermissions);


    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [name]: checked
        }));
    };


    const handleMasterCheckboxChange = (e) => {
        const { checked } = e.target;
        const updatedPermissions = {};
        for (const key in permissions) {
            updatedPermissions[key] = checked;
        }
        setPermissions(updatedPermissions);
    };

    const combinePermissions = () => {
        return Object.keys(permissions).filter(key => permissions[key]).join(',');
    };






    const UpdateAdmin = async (event) => {
        event.preventDefault();
        const combinedPermissions = combinePermissions();

        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("image", image);
        formData.append("designation", data.designation);
        formData.append("role", "Admin");
        formData.append("permissions", combinedPermissions);
        await dispatch(CreateAdminAction(formData))
    }
    useEffect(() => {
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_ADMINS_RESET })
            navigate('/admin/admin')
        }
        if (status && status === 422) {
            toast.error(message, { theme: "colored" })
            dispatch({ type: CLEAR_ERRORS })
        }
    }, [dispatch, navigate, isCreated, status, message]);
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Create Admin" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header border-bottom ">
                                <h4 className="card-title">Create Admin </h4>
                            </div>

                            {
                                loading ? <LoadingTable /> : (
                                    <form method="post" onSubmit={UpdateAdmin} className='p-2'>
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
                                                    <label className="form-label">Designation</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.designation} name='designation' required />
                                                </div>
                                            </div>
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
                                        <div className='row'>
                                            <div className='col'>
                                                <span class="float-right">
                                                    <div class="custom-control custom-checkbox my-1">
                                                        <input class="custom-control-input" id="All" type="checkbox" name="masterCheckbox" checked={Object.values(permissions).every(checked => checked)} onChange={handleMasterCheckboxChange} />
                                                        <label class="custom-control-label" htmlFor="All">All Permissions</label>
                                                    </div>
                                                </span>


                                                <table class="table table-striped table-hover mb-1">
                                                    <thead>
                                                        <tr>
                                                            <th width="40%">Modal</th>
                                                            <th>Create</th>
                                                            <th>Read</th>
                                                            <th>Update</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr>
                                                            <td width="40%" valign="middle">Admins</td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateAdmin" onChange={handleCheckboxChange} checked={permissions.CreateAdmin} type="checkbox" name="CreateAdmin" />
                                                                    <label class="custom-control-label" htmlFor="CreateAdmin"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadAdmin" onChange={handleCheckboxChange} checked={permissions.ReadAdmin} type="checkbox" name="ReadAdmin" />
                                                                    <label class="custom-control-label" htmlFor="ReadAdmin"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateAdmin" onChange={handleCheckboxChange} checked={permissions.UpdateAdmin} type="checkbox" name="UpdateAdmin" />
                                                                    <label class="custom-control-label" htmlFor="UpdateAdmin"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteAdmin" onChange={handleCheckboxChange} checked={permissions.DeleteAdmin} type="checkbox" name="DeleteAdmin" />
                                                                    <label class="custom-control-label" htmlFor="DeleteAdmin"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">Client</td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateClient" onChange={handleCheckboxChange} checked={permissions.CreateClient} type="checkbox" name="CreateClient" />
                                                                    <label class="custom-control-label" htmlFor="CreateClient"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadClient" onChange={handleCheckboxChange} checked={permissions.ReadClient} type="checkbox" name="ReadClient" />
                                                                    <label class="custom-control-label" htmlFor="ReadClient"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateClient" onChange={handleCheckboxChange} checked={permissions.UpdateClient} type="checkbox" name="UpdateClient" />
                                                                    <label class="custom-control-label" htmlFor="UpdateClient"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteClient" onChange={handleCheckboxChange} checked={permissions.DeleteClient} type="checkbox" name="DeleteClient" />
                                                                    <label class="custom-control-label" htmlFor="DeleteClient"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">Subscription</td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadSubscription" onChange={handleCheckboxChange} checked={permissions.ReadSubscription} type="checkbox" name="ReadSubscription" />
                                                                    <label class="custom-control-label" htmlFor="ReadSubscription"></label>
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteSubscription" onChange={handleCheckboxChange} checked={permissions.DeleteSubscription} type="checkbox" name="DeleteSubscription" />
                                                                    <label class="custom-control-label" htmlFor="DeleteSubscription"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">Cancellation Requests</td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadCancellationRequests" onChange={handleCheckboxChange} checked={permissions.ReadCancellationRequests} type="checkbox" name="ReadCancellationRequests" />
                                                                    <label class="custom-control-label" htmlFor="ReadCancellationRequests"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateCancellationRequests" onChange={handleCheckboxChange} checked={permissions.UpdateCancellationRequests} type="checkbox" name="UpdateCancellationRequests" />
                                                                    <label class="custom-control-label" htmlFor="UpdateCancellationRequests"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteCancellationRequests" onChange={handleCheckboxChange} checked={permissions.DeleteCancellationRequests} type="checkbox" name="DeleteCancellationRequests" />
                                                                    <label class="custom-control-label" htmlFor="DeleteCancellationRequests"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">Billing Information</td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadBillingInformation" onChange={handleCheckboxChange} checked={permissions.ReadBillingInformation} type="checkbox" name="ReadBillingInformation" />
                                                                    <label class="custom-control-label" htmlFor="ReadBillingInformation"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateBillingInformation" onChange={handleCheckboxChange} checked={permissions.UpdateBillingInformation} type="checkbox" name="UpdateBillingInformation" />
                                                                    <label class="custom-control-label" htmlFor="UpdateBillingInformation"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteBillingInformation" onChange={handleCheckboxChange} checked={permissions.DeleteBillingInformation} type="checkbox" name="DeleteBillingInformation" />
                                                                    <label class="custom-control-label" htmlFor="DeleteBillingInformation"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">Invoice Management</td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateInvoiceManagement" onChange={handleCheckboxChange} checked={permissions.CreateInvoiceManagement} type="checkbox" name="CreateInvoiceManagement" />
                                                                    <label class="custom-control-label" htmlFor="CreateInvoiceManagement"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadInvoiceManagement" onChange={handleCheckboxChange} checked={permissions.ReadInvoiceManagement} type="checkbox" name="ReadInvoiceManagement" />
                                                                    <label class="custom-control-label" htmlFor="ReadInvoiceManagement"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateInvoiceManagement" onChange={handleCheckboxChange} checked={permissions.UpdateInvoiceManagement} type="checkbox" name="UpdateInvoiceManagement" />
                                                                    <label class="custom-control-label" htmlFor="UpdateInvoiceManagement"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteInvoiceManagement" onChange={handleCheckboxChange} checked={permissions.DeleteInvoiceManagement} type="checkbox" name="DeleteInvoiceManagement" />
                                                                    <label class="custom-control-label" htmlFor="DeleteInvoiceManagement"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">PopUp Messages</td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreatePopUpMessages" onChange={handleCheckboxChange} checked={permissions.CreatePopUpMessages} type="checkbox" name="CreatePopUpMessages" />
                                                                    <label class="custom-control-label" htmlFor="CreatePopUpMessages"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadPopUpMessages" onChange={handleCheckboxChange} checked={permissions.ReadPopUpMessages} type="checkbox" name="ReadPopUpMessages" />
                                                                    <label class="custom-control-label" htmlFor="ReadPopUpMessages"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdatePopUpMessages" onChange={handleCheckboxChange} checked={permissions.UpdatePopUpMessages} type="checkbox" name="UpdatePopUpMessages" />
                                                                    <label class="custom-control-label" htmlFor="UpdatePopUpMessages"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeletePopUpMessages" onChange={handleCheckboxChange} checked={permissions.DeletePopUpMessages} type="checkbox" name="DeletePopUpMessages" />
                                                                    <label class="custom-control-label" htmlFor="DeletePopUpMessages"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">Lead Tracking</td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadLeadTracking" onChange={handleCheckboxChange} checked={permissions.ReadLeadTracking} type="checkbox" name="ReadLeadTracking" />
                                                                    <label class="custom-control-label" htmlFor="ReadLeadTracking"></label>
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteLeadTracking" onChange={handleCheckboxChange} checked={permissions.DeleteLeadTracking} type="checkbox" name="DeleteLeadTracking" />
                                                                    <label class="custom-control-label" htmlFor="DeleteLeadTracking"></label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td width="40%" valign="middle">Support Ticket</td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadSupportTicket" onChange={handleCheckboxChange} checked={permissions.ReadSupportTicket} type="checkbox" name="ReadSupportTicket" />
                                                                    <label class="custom-control-label" htmlFor="ReadSupportTicket"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateSupportTicket" onChange={handleCheckboxChange} checked={permissions.UpdateSupportTicket} type="checkbox" name="UpdateSupportTicket" />
                                                                    <label class="custom-control-label" htmlFor="UpdateSupportTicket"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteSupportTicket" onChange={handleCheckboxChange} checked={permissions.DeleteSupportTicket} type="checkbox" name="DeleteSupportTicket" />
                                                                    <label class="custom-control-label" htmlFor="DeleteSupportTicket"></label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">FeedBack</td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadFeedBack" onChange={handleCheckboxChange} checked={permissions.ReadFeedBack} type="checkbox" name="ReadFeedBack" />
                                                                    <label class="custom-control-label" htmlFor="ReadFeedBack"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateFeedBack" onChange={handleCheckboxChange} checked={permissions.UpdateFeedBack} type="checkbox" name="UpdateFeedBack" />
                                                                    <label class="custom-control-label" htmlFor="UpdateFeedBack"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteFeedBack" onChange={handleCheckboxChange} checked={permissions.DeleteFeedBack} type="checkbox" name="DeleteFeedBack" />
                                                                    <label class="custom-control-label" htmlFor="DeleteFeedBack"></label>
                                                                </div>
                                                            </td>
                                                        </tr>




                                                        <tr>
                                                            <td width="40%" valign="middle">Custom Menu</td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateCustomMenu" onChange={handleCheckboxChange} checked={permissions.CreateCustomMenu} type="checkbox" name="CreateCustomMenu" />
                                                                    <label class="custom-control-label" htmlFor="CreateCustomMenu"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadCustomMenu" onChange={handleCheckboxChange} checked={permissions.ReadCustomMenu} type="checkbox" name="ReadCustomMenu" />
                                                                    <label class="custom-control-label" htmlFor="ReadCustomMenu"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateCustomMenu" onChange={handleCheckboxChange} checked={permissions.UpdateCustomMenu} type="checkbox" name="UpdateCustomMenu" />
                                                                    <label class="custom-control-label" htmlFor="UpdateCustomMenu"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteCustomMenu" onChange={handleCheckboxChange} checked={permissions.DeleteCustomMenu} type="checkbox" name="DeleteCustomMenu" />
                                                                    <label class="custom-control-label" htmlFor="DeleteCustomMenu"></label>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </div>

                                        </div>




                                        <div className="row">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Creating...' : 'Create'}</button>
                                            </div>
                                        </div>
                                    </form>
                                )
                            }

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AdminAdminCreate
