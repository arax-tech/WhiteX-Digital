import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import { toast } from 'react-toastify';
import { CreateClientAction, GetCustomersAction } from '../../../redux/actions/Admin/ClientAction';
import { CLEAR_ERRORS, CREATE_CLIENT_RESET } from '../../../redux/constants/Admin/ClientConstant';
import { ClientInitialPermissions } from '../../client/Permissions';


const AdminClientCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isCreated, status, customers, message } = useSelector((state) => state.clients);


    const [data, setData] = useState({
        email: '',
    })




    useEffect(() => {
        dispatch(GetCustomersAction())
    }, []);

    
    const InpChnage = (event) => {
        // if (event.target.name === "image") {
        //     setImage(event.target.files[0]);
        // } else {
        //     setData({ ...data, [event.target.name]: event.target.value })
        // }
        setData({ ...data, [event.target.name]: event.target.value })
    }






    const [permissions, setPermissions] = useState(ClientInitialPermissions);


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






    const CreateClientFunction = async (event) => {
        event.preventDefault();
        const combinedPermissions = combinePermissions();

        event.preventDefault();
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("permissions", combinedPermissions);
        await dispatch(CreateClientAction(formData))
    }
    useEffect(() => {
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_CLIENT_RESET })
            navigate('/admin/client')
        }
        if (status && status === 422) {
            toast.error(message, { theme: "colored" })
            dispatch({ type: CLEAR_ERRORS })
        }
    }, [dispatch, navigate, isCreated, status, message]);
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Create Client" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header border-bottom ">
                                <h4 className="card-title">Create Client </h4>
                            </div>

                            {
                                loading ? <LoadingTable /> : (
                                    <form method="post" onSubmit={CreateClientFunction} className='p-2'>
                                        <div className='row'>
                                            {/* <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Name</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.name} name='name' required />
                                                </div>
                                            </div> */}
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Email</label>
                                                    <select className="form-control" onChange={InpChnage} value={data.email} required name='email'>
                                                        {
                                                            customers?.map((customer, index) => (
                                                                <option key={index} value={`${customer?.id}--|--${customer?.email}`}>{customer?.username}----{customer?.email}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className='row'>
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

                                        </div> */}
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
                                                            <td width="40%" valign="middle">Teams</td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateTeam" onChange={handleCheckboxChange} checked={permissions.CreateTeam} type="checkbox" name="CreateTeam" />
                                                                    <label class="custom-control-label" htmlFor="CreateTeam"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadTeam" onChange={handleCheckboxChange} checked={permissions.ReadTeam} type="checkbox" name="ReadTeam" />
                                                                    <label class="custom-control-label" htmlFor="ReadTeam"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="UpdateTeam" onChange={handleCheckboxChange} checked={permissions.UpdateTeam} type="checkbox" name="UpdateTeam" />
                                                                    <label class="custom-control-label" htmlFor="UpdateTeam"></label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="DeleteTeam" onChange={handleCheckboxChange} checked={permissions.DeleteTeam} type="checkbox" name="DeleteTeam" />
                                                                    <label class="custom-control-label" htmlFor="DeleteTeam"></label>
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
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateCancellationRequests" onChange={handleCheckboxChange} checked={permissions.CreateCancellationRequests} type="checkbox" name="CreateCancellationRequests" />
                                                                    <label class="custom-control-label" htmlFor="CreateCancellationRequests"></label>
                                                                </div>
                                                            </td>
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
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td width="40%" valign="middle">Invoice Management</td>
                                                            <td></td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="ReadInvoiceManagement" onChange={handleCheckboxChange} checked={permissions.ReadInvoiceManagement} type="checkbox" name="ReadInvoiceManagement" />
                                                                    <label class="custom-control-label" htmlFor="ReadInvoiceManagement"></label>
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>

                                                        <tr>
                                                            <td width="40%" valign="middle">Support Ticket</td>
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateSupportTicket" onChange={handleCheckboxChange} checked={permissions.CreateSupportTicket} type="checkbox" name="CreateSupportTicket" />
                                                                    <label class="custom-control-label" htmlFor="CreateSupportTicket"></label>
                                                                </div>
                                                            </td>
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
                                                            <td>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input class="custom-control-input" id="CreateFeedBack" onChange={handleCheckboxChange} checked={permissions.CreateFeedBack} type="checkbox" name="CreateFeedBack" />
                                                                    <label class="custom-control-label" htmlFor="CreateFeedBack"></label>
                                                                </div>
                                                            </td>
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

export default AdminClientCreate
