import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Eye, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import { DeleteSubscriptionAction, GetSubscriptionAction } from '../../../redux/actions/Admin/SubscriptionAction';

import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { UncombineAdminPermissions } from '../Permissions';
import { toast } from 'react-toastify';
import { DELETE_SUBSCRIPTION_RESET } from '../../../redux/constants/Admin/SubscriptionConstant';
const AdminSubscription = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, subscriptions, isDeleted, message } = useSelector((state) => state.subscriptions);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);



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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const DeleteSubscriptionFunction = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteSubscriptionAction(id));
        }
    }

    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Subscription" />
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
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Initial Amount</th>
                                                    <th>recurring amount</th>
                                                    <th>total payments</th>
                                                    <th>trial period</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    subscriptions?.map((subscription, index) => (
                                                        <tr key={index}>

                                                            <td>{subscription?.initial_amount}</td>
                                                            <td>{subscription?.recurring_amount}</td>
                                                            <td>{subscription?.total_payments}</td>
                                                            <td>{subscription?.trial_period}</td>
                                                            <td>
                                                                <div className="btn-group">
                                                                    {/* {
                                                                        allPermissions.UpdateSubscription && (
                                                                            <Link to={`/subscription/edit/subscription/${subscription?.id}`} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></Link>
                                                                        )
                                                                    } */}
                                                                    <button onClick={handleShow} className='btn btn-primary btn-sm'><Eye style={{ width: 14, height: 14 }} /></button>
                                                                    {
                                                                        allPermissions.DeleteSubscription && (
                                                                            <button onClick={() => DeleteSubscriptionFunction(subscription?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
                                                                        )
                                                                    }
                                                                </div>
                                                            </td>

                                                            <Modal size='lg' show={show} onHide={handleClose}>
                                                                <Modal.Header>
                                                                    <Modal.Title>Subscription Details</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <div className="row border-bottom mb-1">
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Parent Order Id </label><br />
                                                                            <label className="mb-1">{subscription?.parent_order_id}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Plan Id </label><br />
                                                                            <label className="mb-1">{subscription?.plan_id}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Customer Id </label><br />
                                                                            <label className="mb-1">{subscription?.customer_id}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Billing Frequency </label><br />
                                                                            <label className="mb-1">{subscription?.billing_frequency}</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row border-bottom mb-1">
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Initial Amount </label><br />
                                                                            <label className="mb-1">{subscription?.initial_amount}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Initial Tax Rate </label><br />
                                                                            <label className="mb-1">{subscription?.initial_tax_rate}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Initial Tax </label><br />
                                                                            <label className="mb-1">{subscription?.initial_tax}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Recurring Amount </label><br />
                                                                            <label className="mb-1">{subscription?.recurring_amount}</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row border-bottom mb-1">
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Recurring Tax Rate </label><br />
                                                                            <label className="mb-1">{subscription?.recurring_tax_rate}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Recurring Tax </label><br />
                                                                            <label className="mb-1">{subscription?.recurring_tax}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Total Payments </label><br />
                                                                            <label className="mb-1">{subscription?.total_payments}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Trial Period </label><br />
                                                                            <label className="mb-1">{subscription?.trial_period}</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row border-bottom mb-1">
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Profile Id  </label><br />
                                                                            <label className="mb-1">{subscription?.profile_id}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Status  </label><br />
                                                                            <label className="mb-1">{subscription?.status}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Created Date </label><br />
                                                                            <label className="mb-1">{moment(subscription?.created_date).format('DD MMM yyyy, hh:mm A')}</label>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="mb-1 font-weight-bolder">Expiration Date </label><br />
                                                                            <label className="mb-1">{moment(subscription?.expiration_date).format('DD MMM yyyy, hh:mm A')}</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-1">
                                                                        <div className="col-md-12">
                                                                            <label className="mb-1 font-weight-bolder">Notes  </label><br />
                                                                            <label className="mb-1">{subscription?.notes}</label>
                                                                        </div>
                                                                    </div>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <button onClick={handleClose} className='btn btn-primary btn-sm'>Close</button>

                                                                </Modal.Footer>
                                                            </Modal>
                                                        </tr>


                                                    ))
                                                }


                                            </tbody>
                                        </table>
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

export default AdminSubscription
