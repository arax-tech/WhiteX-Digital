import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Eye } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import { GetSubscriptionAction, UpdateSubscriptionAction } from '../../../redux/actions/Admin/SubscriptionAction';

import Modal from 'react-bootstrap/Modal';
import { Tabs, Tab } from 'react-bootstrap';
import './Subscription.css'
import moment from 'moment';
import { UncombineAdminPermissions } from '../Permissions';
import { toast } from 'react-toastify';
import { DELETE_SUBSCRIPTION_RESET, UPDATE_SUBSCRIPTION_RESET } from '../../../redux/constants/Admin/SubscriptionConstant';
import $ from 'jquery';
const AdminSubscription = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, subscriptions, plans, isDeleted, message, isUpdated } = useSelector((state) => state.subscriptions);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);


    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);

    useEffect(() => {
        if (allPermissions && !allPermissions.ReadSubscription) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);
    useEffect(() => {
        dispatch(GetSubscriptionAction())

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_SUBSCRIPTION_RESET })
        }
    }, [dispatch, isDeleted, message]);

    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [planId, setPlanId] = useState(null);

    const handleViewDetails = (subscription) => {
        setSelectedSubscription(subscription);
    };
    const handleCloseModal = () => {
        setSelectedSubscription(null);
    };

    const UpdatedSubscriptionFunction = async (event) => {
        event.preventDefault();
        // const updateSubscription = {
        //     ...selectedSubscription,
        //     line_items: [{
        //         ...selectedSubscription.line_items[0], // Assuming only one item in the subscription
        //         product_id: planId, // Update with the new product ID
        //     }]
        // }

        dispatch(UpdateSubscriptionAction(selectedSubscription?.id, planId));
    };



    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success('Subscription Update Successfully...', { theme: "colored" })
            dispatch({ type: UPDATE_SUBSCRIPTION_RESET })
            dispatch(GetSubscriptionAction());
            setSelectedSubscription(null);
            navigate('/admin/subscription')
        }
    }, [dispatch, navigate, isUpdated, message]);

    const [key, setKey] = useState('tab1');

    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Subscriptions" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Subscriptions</h4>
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>Subscription</th>
                                            <th>Item</th>
                                            <th>Total</th>
                                            <th>Start Date</th>
                                            <th>Next Payment</th>
                                            <th>End Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            subscriptions?.map((subscription, index) => (
                                                <tr key={index}>

                                                    <td>#{subscription?.id} for {`${subscription?.user?.first_name} ${subscription?.user?.last_name}`}</td>
                                                    <td>{subscription?.line_items[0]?.name}</td>
                                                    <td>{subscription?.line_items[0]?.subtotal} / {subscription?.billing_period}</td>
                                                    <td>{subscription?.start_date_gmt ? moment(subscription?.start_date_gmt).format('DD MMM yyyy') : '-'}</td>
                                                    <td>{subscription?.next_payment_date_gmt ? moment(subscription?.next_payment_date_gmt).format('DD MMM yyyy') : '-'}</td>
                                                    <td>{subscription?.end_date_gmt ? moment(subscription?.end_date_gmt).format('DD MMM yyyy') : '-'}</td>
                                                    <td>
                                                        {subscription?.status === "pending-cancel" && (<span className='badge badge-pill badge-light-secondary  mr-1'>Pending Cancel</span>)}
                                                        {subscription?.status === "expired" && (<span className='badge badge-pill badge-light-info  mr-1'>Expired</span>)}
                                                        {subscription?.status === "on-hold" && (<span className='badge badge-pill badge-light-warning  mr-1'>On Hold</span>)}
                                                        {subscription?.status === "active" && (<span className='badge badge-pill badge-light-success  mr-1'>Active</span>)}
                                                        {subscription?.status === "cancelled" && (<span className='badge badge-pill badge-light-danger  mr-1'>Cancelled</span>)}
                                                    </td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button onClick={() => handleViewDetails(subscription)} className='btn btn-primary btn-sm'><Eye style={{ width: 14, height: 14 }} /></button>
                                                            <Link target='_blank' className='btn btn-success btn-sm' to={`https://whitexdigital.com/product/${subscription?.line_items[0]?.product_id}`}><Eye style={{ width: 14, height: 14 }} /></Link>
                                                        </div>
                                                    </td>
                                                    {/* <Link className='btn btn-success btn-sm'> target="_blank" to={`${}`>View</Link> */}

                                                    <Modal size='lg' show={selectedSubscription !== null} onHide={handleCloseModal}>
                                                        <Modal.Header>
                                                            <Modal.Title>Subscription Details</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {
                                                                selectedSubscription && (
                                                                    <Tabs id="controlled-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                                                                        <Tab eventKey="tab1" title="Detail">

                                                                            <div className="row border-bottom mb-1">
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Subscription</label><br />
                                                                                    <label className="mb-1">#{selectedSubscription?.id} for {`${selectedSubscription?.user?.first_name} ${selectedSubscription?.user?.last_name}`}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Item </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.line_items[0]?.name}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Total </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.line_items[0]?.subtotal} / {selectedSubscription?.billing_period}</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row border-bottom mb-1">
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Start Date </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.start_date_gmt ? moment(selectedSubscription?.start_date_gmt).format('DD MMM yyyy') : '-'}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Next Payment </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.next_payment_date_gmt ? moment(selectedSubscription?.next_payment_date_gmt).format('DD MMM yyyy') : '-'}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">End Date </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.end_date_gmt ? moment(selectedSubscription?.end_date_gmt).format('DD MMM yyyy') : '-'}</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-4">
                                                                                    <label className=" font-weight-bolder">Status </label><br />
                                                                                    <label className="">
                                                                                        {selectedSubscription?.status === "pending-cancel" && (<span className='badge badge-pill badge-light-secondary  mr-1'>Pending Cancel</span>)}
                                                                                        {selectedSubscription?.status === "expired" && (<span className='badge badge-pill badge-light-info  mr-1'>Expired</span>)}
                                                                                        {selectedSubscription?.status === "on-hold" && (<span className='badge badge-pill badge-light-warning  mr-1'>On Hold</span>)}
                                                                                        {selectedSubscription?.status === "active" && (<span className='badge badge-pill badge-light-success  mr-1'>Active</span>)}
                                                                                        {selectedSubscription?.status === "cancelled" && (<span className='badge badge-pill badge-light-danger  mr-1'>Cancelled</span>)}
                                                                                    </label>
                                                                                </div>


                                                                            </div>
                                                                        </Tab>
                                                                        <Tab eventKey="tab2" title="Billing Info">
                                                                            <div className="row border-bottom mb-1">
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Full Name</label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.billing?.first_name} {selectedSubscription?.billing?.last_name}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Company </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.billing?.company}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Email </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.billing?.email}</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row border-bottom mb-1">
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">Phone </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.billing?.phone}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">City </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.billing?.city}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className="mb-1 font-weight-bolder">State </label><br />
                                                                                    <label className="mb-1">{selectedSubscription?.billing?.state}</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-4">
                                                                                    <label className=" font-weight-bolder">Country </label><br />
                                                                                    <label className="">{selectedSubscription?.billing?.country}</label>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <label className=" font-weight-bolder">Post Code </label><br />
                                                                                    <label className="">{selectedSubscription?.billing?.postcode}</label>
                                                                                </div>

                                                                                <div className="col-md-4">
                                                                                    <label className=" font-weight-bolder">Full Address </label><br />
                                                                                    <label className="">{selectedSubscription?.billing?.address_1}, {selectedSubscription?.billing?.address_2}</label>
                                                                                </div>

                                                                            </div>
                                                                        </Tab>

                                                                        <Tab eventKey="tab3" title="Upgrade Downgrade Subscription">
                                                                            <form method="post" onSubmit={UpdatedSubscriptionFunction} className='p-2'>
                                                                                <div className='row'>
                                                                                    <div className='col'>
                                                                                        <div className="form-group">
                                                                                            <label className="form-label">Select Plan</label>
                                                                                            <select className="form-control" onChange={(event) => setPlanId(event.target.value)} value={planId}>
                                                                                                {plans?.map((plan, index) => (
                                                                                                    <option key={index} value={plan.id}>
                                                                                                        {plan.name}
                                                                                                    </option>
                                                                                                ))}
                                                                                            </select>

                                                                                        </div>
                                                                                    </div>

                                                                                </div>

                                                                                <div className="row">
                                                                                    <div className="col">
                                                                                        <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Updating...' : 'Update'}</button>
                                                                                    </div>
                                                                                </div>
                                                                            </form>

                                                                        </Tab>
                                                                        {/* <Tab eventKey="tab4" title="Orders">
                                                                                    <table className='table table-striped table-hover'>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th>Order</th>
                                                                                                <th>Date</th>
                                                                                                <th>Status</th>
                                                                                                <th>Total</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {
                                                                                                selectedSubscription?.orders?.map((order, index) => (
                                                                                                    <tr>
                                                                                                        <td>#{order?.id} {order?.billing?.first_name} {order?.billing?.last_name}</td>
                                                                                                        <td>{order?.date_created ? moment(order?.date_created).format('DD MMM yyyy') : '-'}</td>
                                                                                                        <td>{order?.status}</td>
                                                                                                        <td>{order?.total}</td>
                                                                                                    </tr>
                                                                                                ))
                                                                                            }
                                                                                        </tbody>
                                                                                    </table>
                                                                                </Tab> */}
                                                                    </Tabs>
                                                                )
                                                            }



                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <button onClick={handleCloseModal} className='btn btn-primary btn-sm'>Close</button>

                                                        </Modal.Footer>
                                                    </Modal>
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

export default AdminSubscription
