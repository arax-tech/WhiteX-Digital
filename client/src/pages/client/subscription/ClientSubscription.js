import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Eye } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { UncombineClientPermissions } from '../Permissions';
import { GetSubscriptionAction } from '../../../redux/actions/Client/SubscriptionAction';
import { Tab, Tabs } from 'react-bootstrap';
const ClientSubscription = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, subscription } = useSelector((state) => state.subscription);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);



    useEffect(() => {
        if (allPermissions && !allPermissions.ReadSubscription) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);
    useEffect(() => {
        dispatch(GetSubscriptionAction(user?.customer_id))
    }, [dispatch]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [key, setKey] = useState('tab1');
    return (
        <div className="content-wrapper">
            <MetaData title="Client - Subscription" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Subscription</h4>
                            </div>

                            {
                                loading ? <LoadingTable /> : (
                                    <div className="table-responsive">
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


                                                    <tr>

                                                        <td>#{subscription?.id} for {`${subscription?.billing?.first_name} ${subscription?.billing?.last_name}`}</td>
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
                                                                <button onClick={handleShow} className='btn btn-primary btn-sm'><Eye style={{ width: 14, height: 14 }} /></button>
                                                            </div>
                                                        </td>

                                                        <Modal size='lg' show={show} onHide={handleClose}>
                                                            <Modal.Header>
                                                                <Modal.Title>Subscription Details</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                {
                                                                    subscription && (
                                                                        <Tabs id="controlled-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                                                                            <Tab eventKey="tab1" title="Detail">

                                                                                <div className="row border-bottom mb-1">
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Subscription</label><br />
                                                                                        <label className="mb-1">#{subscription?.id} for {`${subscription?.billing?.first_name} ${subscription?.billing?.last_name}`}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Item </label><br />
                                                                                        <label className="mb-1">{subscription?.line_items[0]?.name}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Total </label><br />
                                                                                        <label className="mb-1">{subscription?.line_items[0]?.subtotal} / {subscription?.billing_period}</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row border-bottom mb-1">
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Start Date </label><br />
                                                                                        <label className="mb-1">{subscription?.start_date_gmt ? moment(subscription?.start_date_gmt).format('DD MMM yyyy') : '-'}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Next Payment </label><br />
                                                                                        <label className="mb-1">{subscription?.next_payment_date_gmt ? moment(subscription?.next_payment_date_gmt).format('DD MMM yyyy') : '-'}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">End Date </label><br />
                                                                                        <label className="mb-1">{subscription?.end_date_gmt ? moment(subscription?.end_date_gmt).format('DD MMM yyyy') : '-'}</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <label className=" font-weight-bolder">Status </label><br />
                                                                                        <label className="">
                                                                                            {subscription?.status === "pending-cancel" && (<span className='badge badge-pill badge-light-secondary  mr-1'>Pending Cancel</span>)}
                                                                                            {subscription?.status === "expired" && (<span className='badge badge-pill badge-light-info  mr-1'>Expired</span>)}
                                                                                            {subscription?.status === "on-hold" && (<span className='badge badge-pill badge-light-warning  mr-1'>On Hold</span>)}
                                                                                            {subscription?.status === "active" && (<span className='badge badge-pill badge-light-success  mr-1'>Active</span>)}
                                                                                            {subscription?.status === "cancelled" && (<span className='badge badge-pill badge-light-danger  mr-1'>Cancelled</span>)}
                                                                                        </label>
                                                                                    </div>


                                                                                </div>
                                                                            </Tab>
                                                                            <Tab eventKey="tab2" title="Billing Info">
                                                                                <div className="row border-bottom mb-1">
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Full Name</label><br />
                                                                                        <label className="mb-1">{subscription?.billing?.first_name} {subscription?.billing?.last_name}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Company </label><br />
                                                                                        <label className="mb-1">{subscription?.billing?.company}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Email </label><br />
                                                                                        <label className="mb-1">{subscription?.billing?.email}</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row border-bottom mb-1">
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">Phone </label><br />
                                                                                        <label className="mb-1">{subscription?.billing?.phone}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">City </label><br />
                                                                                        <label className="mb-1">{subscription?.billing?.city}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className="mb-1 font-weight-bolder">State </label><br />
                                                                                        <label className="mb-1">{subscription?.billing?.state}</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <label className=" font-weight-bolder">Country </label><br />
                                                                                        <label className="">{subscription?.billing?.country}</label>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <label className=" font-weight-bolder">Post Code </label><br />
                                                                                        <label className="">{subscription?.billing?.postcode}</label>
                                                                                    </div>

                                                                                    <div className="col-md-4">
                                                                                        <label className=" font-weight-bolder">Full Address </label><br />
                                                                                        <label className="">{subscription?.billing?.address_1}, {subscription?.billing?.address_2}</label>
                                                                                    </div>

                                                                                </div>
                                                                            </Tab>
                                                                        </Tabs>
                                                                    )
                                                                }



                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <button onClick={handleClose} className='btn btn-primary btn-sm'>Close</button>

                                                            </Modal.Footer>
                                                        </Modal>
                                                    </tr>






                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default ClientSubscription
