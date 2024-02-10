import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { UncombineClientPermissions } from '../Permissions';
import { GetCustomerAction, GetSubscriptionAction, UpdateBillingAction } from '../../../redux/actions/Client/SubscriptionAction';
import { toast } from 'react-toastify';
import { UPDATE_BILLING_RESET } from '../../../redux/constants/Client/SubscriptionConstant';
import LoadingTable from '../../../components/LoadingTable';
const ClientBillingInformation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, customer } = useSelector((state) => state.subscription);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);
    
    
    useEffect(() => {
        if (allPermissions && !allPermissions.ReadBillingInformation) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    const [billingDetails, setBillingDetails] = useState({
        address_1: customer?.billing?.address_1,
        address_2: customer?.billing?.address_2,
        city: customer?.billing?.city,
        company: customer?.billing?.company,
        country: customer?.billing?.country,
        email: customer?.billing?.email,
        first_name: customer?.billing?.first_name,
        last_name: customer?.billing?.last_name,
        phone: customer?.billing?.phone,
        state: customer?.billing?.state,
        postcode: customer?.billing?.postcode,
    });
    
    useEffect(() => {
        dispatch(GetCustomerAction(user?.customer_id))
    }, [dispatch, user]);
    useEffect(() => {
        setBillingDetails({
            address_1: customer?.billing?.address_1,
            address_2: customer?.billing?.address_2,
            city: customer?.billing?.city,
            company: customer?.billing?.company,
            country: customer?.billing?.country,
            email: customer?.billing?.email,
            first_name: customer?.billing?.first_name,
            last_name: customer?.billing?.last_name,
            phone: customer?.billing?.phone,
            state: customer?.billing?.state,
            postcode: customer?.billing?.postcode,
        });
    }, [customer]);

    

    const InpChnage = (event) => {
        setBillingDetails({ ...billingDetails, [event.target.name]: event.target.value })
    }

    const UpdayeBillingFunction = async (event) => {
        event.preventDefault();
        await dispatch(UpdateBillingAction(user?.customer_id, billingDetails))
        toast.success('Billing Update Successfully...', { theme: "colored" })
    }
    
    
    return (
        <div className="content-wrapper">
            <MetaData title="Client - Billing Information" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Billing Information</h4>
                            </div>


                            <div className="table-responsive">
                                {
                                    loading ? <LoadingTable /> : (
                                        <form method="post" onSubmit={UpdayeBillingFunction} className='p-2'>
                                            <div className='row'>

                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">First Name</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.first_name} name='first_name' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Last Name</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.last_name} name='last_name' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Email</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.email} name='email' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Phone</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.phone} name='phone' required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Company</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.company} name='company' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">City</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.city} name='city' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">State</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.state} name='state' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Country</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.country} name='country' required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Address 1</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.address_1} name='address_1' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Address 2</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.address_2} name='address_2' required />
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Post Code</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={billingDetails.postcode} name='postcode' required />
                                                    </div>
                                                </div>



                                            </div>



                                            <div className="row">
                                                <div className="col">
                                                    <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Updating...' : 'Update'}</button>
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
        </div>
    )
}

export default ClientBillingInformation
