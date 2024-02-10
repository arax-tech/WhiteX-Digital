import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../Permissions';
import { DeleteSubscriptionCancellationAction, GetSubscriptionCancellationAction, UpdateSubscriptionCancellationAction } from '../../../redux/actions/Admin/SubscriptionCancellationAction';
import { DELETE_SUBSCRIPTION_CANCELLATION_RESET, UPDATE_SUBSCRIPTION_CANCELLATION_RESET } from '../../../redux/constants/Admin/SubscriptionCancellationConstant';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';
const AdminSubscriptionCancellation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, cancellations, isUpdated, isDeleted, message } = useSelector((state) => state.subscriptionCancellations);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);

    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);

    useEffect(() => {
        if (allPermissions && !allPermissions.ReadCancellationRequests) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetSubscriptionCancellationAction())

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_SUBSCRIPTION_CANCELLATION_RESET })
        }

    }, [dispatch, isDeleted, message]);

    const DeleteSubCancellations = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteSubscriptionCancellationAction(id));
        }
    }

    const [selectedCanSub, setSelectedCanSub] = useState(null);
    const [status, setStatus] = useState();

    const handleUpdateCanSub = (subscription) => {
        setSelectedCanSub(subscription);
    };
    const handleCloseModal = () => {
        setSelectedCanSub(null);
    };

    const UpdatedSubscriptionCancellationFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("status", status);
        await dispatch(UpdateSubscriptionCancellationAction(selectedCanSub?.id, formData))
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: UPDATE_SUBSCRIPTION_CANCELLATION_RESET })
            setSelectedCanSub(null);
            dispatch(GetSubscriptionCancellationAction())
        }
    }, [dispatch, isUpdated, message]);



    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Subscription Cancellation Requests" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Subscription Cancellation Requests</h4>
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>RegisterAt</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cancellations?.map((cancellations, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={cancellations?.user_image?.length > 0 ? cancellations?.user_image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                        <span className="font-weight-bold">{cancellations?.user_name}</span>
                                                        <span className="font-weight-bold"></span>
                                                    </td>
                                                    <td>{cancellations?.title}</td>
                                                    <td>{cancellations?.description}</td>
                                                    <td>
                                                        {cancellations?.status === "Pending" && (<span className='badge badge-pill badge-light-primary  mr-1'>Pending</span>)}
                                                        {cancellations?.status === "Approved" && (<span className='badge badge-pill badge-light-success  mr-1'>Approved</span>)}
                                                        {cancellations?.status === "Cancelled" && (<span className='badge badge-pill badge-light-danger  mr-1'>Cancelled</span>)}
                                                    </td>
                                                    <td>{moment(cancellations?.created_at).format('DD MMM yyyy')}</td>

                                                    <td>
                                                        <div className="btn-group">
                                                            {
                                                                allPermissions.UpdateCancellationRequests && (
                                                                    <button onClick={() => handleUpdateCanSub(cancellations)} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                            {
                                                                allPermissions.DeleteCancellationRequests && (
                                                                    <button onClick={() => DeleteSubCancellations(cancellations?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                        </div>
                                                    </td>

                                                    <Modal show={selectedCanSub !== null} onHide={handleCloseModal}>
                                                        <Modal.Header>
                                                            <Modal.Title>Subscription Details</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {
                                                                selectedCanSub && (
                                                                    <form method="post" onSubmit={UpdatedSubscriptionCancellationFunction} className='p-2'>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Select Status</label>
                                                                                    <select className="form-control" onChange={(event) => setStatus(event.target.value)} value={status}>
                                                                                        <option value="Pending">Pending</option>
                                                                                        <option value="Approved">Approved</option>
                                                                                        <option value="Cancelled">Cancelled</option>
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

export default AdminSubscriptionCancellation
