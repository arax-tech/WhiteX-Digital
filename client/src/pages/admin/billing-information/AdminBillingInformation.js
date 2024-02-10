import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { GetSubscriptionAction } from '../../../redux/actions/Admin/SubscriptionAction';
import { UncombineAdminPermissions } from '../Permissions';
import $ from 'jquery';
const AdminBillingInformation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, subscriptions } = useSelector((state) => state.subscriptions);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);


    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);
    useEffect(() => {
        if (allPermissions && !allPermissions.ReadBillingInformation) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetSubscriptionAction())
    }, [dispatch]);
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Billing Information" />
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
                                        <table id='MyTable' className="table table-hover px-1">
                                            <thead>
                                                <tr>
                                                    {/* <th>Item</th> */}
                                                    <th>Customer</th>
                                                    <th>Company</th>
                                                    <th>City</th>
                                                    <th>State</th>
                                                    <th>Country</th>
                                                    <th>Full Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    subscriptions?.map((subscription, index) => (
                                                        <tr key={index}>

                                                            {/* <td>{subscription?.line_items[0]?.name}</td> */}
                                                            <td>
                                                                <b>Full Name : </b> {subscription?.billing?.first_name} {subscription?.billing?.last_name} <br />
                                                                <b>Email : </b> {subscription?.billing?.email} <br />
                                                                <b>Phone : </b> {subscription?.billing?.phone} <br />
                                                            </td>
                                                            <td>{subscription?.billing?.company}</td>
                                                            <td>{subscription?.billing?.city}</td>
                                                            <td>{subscription?.billing?.state}</td>
                                                            <td>{subscription?.billing?.country}</td>
                                                            <td>{subscription?.billing?.address_1} - {subscription?.billing?.address_2} , {subscription?.billing?.postcode}</td>
                                                        </tr>
                                                    ))
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AdminBillingInformation
