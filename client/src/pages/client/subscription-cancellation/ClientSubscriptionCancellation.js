import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';
import { UncombineClientPermissions } from '../Permissions';
import { CreateSubscriptionCancellationAction, DeleteSubscriptionCancellationAction, GetSubscriptionCancellationAction, UpdateSubscriptionCancellationAction } from '../../../redux/actions/Client/SubscriptionCancellationAction';
import { CREATE_SUBSCRIPTION_CANCELLATION_RESET, DELETE_SUBSCRIPTION_CANCELLATION_RESET, UPDATE_SUBSCRIPTION_CANCELLATION_RESET } from '../../../redux/constants/Client/SubscriptionCancellationConstant';
const ClientSubscriptionCancellation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, cancellations, isCreated, isUpdated, isDeleted, message } = useSelector((state) => state.clientSubscriptionCancellations);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);

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
    }, [dispatch]);






    const DeleteSubCancellations = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteSubscriptionCancellationAction(id));
        }
    }

    // Update Modal
    const [selectedCancellation, setSelectedCancellation] = useState(null);

    const ShowUpdateModal = (subscription) => {
        setSelectedCancellation(subscription);
        setTitle(subscription?.title);
        setDescription(subscription?.description);
    };
    const CloseUpdateModal = () => {
        setSelectedCancellation(null);
    };




    // Create Modal 
    const [createModal, setCreateModal] = useState(false);

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);


    const CreateCancellationRequestFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        await dispatch(CreateSubscriptionCancellationAction(formData))
    }



    const UpdatedCancellationFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        await dispatch(UpdateSubscriptionCancellationAction(selectedCancellation?.id, formData))
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: UPDATE_SUBSCRIPTION_CANCELLATION_RESET })
            setSelectedCancellation(null);
        }
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_SUBSCRIPTION_CANCELLATION_RESET })

        }
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: CREATE_SUBSCRIPTION_CANCELLATION_RESET })
        }
        dispatch(GetSubscriptionCancellationAction())
        setTitle(null);
        setDescription(null);
        setCreateModal(false);
    }, [dispatch, isCreated, isUpdated, isDeleted, message]);


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
                                {
                                    allPermissions.CreateCancellationRequests && (
                                        <button onClick={() => setCreateModal(true)} className='btn btn-primary float-right'>Create</button>
                                    )
                                }
                                <Modal show={createModal} onHide={() => setCreateModal(false)}>
                                    <Modal.Header>
                                        <Modal.Title>Create Cancellation Requests</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <form method="post" onSubmit={CreateCancellationRequestFunction}>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Title</label>
                                                        <input type="text" className="form-control" onChange={(event) => setTitle(event.target.value)} value={title} required />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Description</label>
                                                        <input type="text" className="form-control" onChange={(event) => setDescription(event.target.value)} value={description} required />

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Creating...' : 'Create'}</button>
                                                </div>
                                            </div>
                                        </form>



                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button onClick={() => setCreateModal(false)} className='btn btn-primary btn-sm'>Close</button>

                                    </Modal.Footer>
                                </Modal>
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>S#</th>
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

                                                    <td>{index + 1}</td>
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
                                                                    <button onClick={() => ShowUpdateModal(cancellations)} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                            {
                                                                allPermissions.DeleteCancellationRequests && (
                                                                    <button onClick={() => DeleteSubCancellations(cancellations?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                        </div>
                                                    </td>

                                                    <Modal show={selectedCancellation !== null} onHide={CloseUpdateModal}>
                                                        <Modal.Header>
                                                            <Modal.Title>Subscription Details</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {
                                                                selectedCancellation && (
                                                                    <form method="post" onSubmit={UpdatedCancellationFunction}>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Title</label>
                                                                                    <input type="text" className="form-control" onChange={(event) => setTitle(event.target.value)} value={title} required />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Description</label>
                                                                                    <input type="text" className="form-control" onChange={(event) => setDescription(event.target.value)} value={description} required />

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
                                                            <button onClick={CloseUpdateModal} className='btn btn-primary btn-sm'>Close</button>

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
        </div >
    )
}

export default ClientSubscriptionCancellation
