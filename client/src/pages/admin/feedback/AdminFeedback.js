import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../Permissions';
import { Modal } from 'react-bootstrap';
import { DeleteFeedbackAction, GetFeedbacksAction, UpdateFeedbackAction } from '../../../redux/actions/Admin/FeedbackAction';
import { DELETE_FEEDBACK_RESET, UPDATE_FEEDBACK_RESET } from '../../../redux/constants/Admin/FeedbackConstant';
import $ from 'jquery';
const AdminFeedback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, feedbacks, isDeleted, isUpdated, message } = useSelector((state) => state.adminFeedback);

    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);

    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);

    useEffect(() => {
        if (allPermissions && !allPermissions.ReadFeedBack) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetFeedbacksAction())
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_FEEDBACK_RESET })
        }

    }, [dispatch, isDeleted, message]);

    const DeleteFeedbackFunc = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteFeedbackAction(id));
        }
    }

    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [actionTaken, setActionTaken] = useState(null);

    const handleUpdateSupport = (feedback) => {
        setSelectedFeedback(feedback);
    };
    const handleCloseModal = () => {
        setSelectedFeedback(null);
    };

    const UpdatedFeedbackFunction = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("action_taken", actionTaken);
        await dispatch(UpdateFeedbackAction(selectedFeedback?.id, formData))
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: UPDATE_FEEDBACK_RESET })
            setSelectedFeedback(null);
            dispatch(GetFeedbacksAction())
        }
    }, [dispatch, isUpdated, message]);


    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Feedbacks" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Feedbacks</h4>
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Ratings</th>
                                            <th>Action Taken</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            feedbacks?.map((feedback, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={feedback?.client?.image?.length > 0 ? feedback?.client?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                        <span className="font-weight-bold">{feedback?.client?.name}</span>
                                                    </td>
                                                    <td>{feedback?.title}</td>
                                                    <td>{feedback?.description}</td>
                                                    <td>{feedback?.category}</td>
                                                    <td>{feedback?.ratings}</td>
                                                    <td>{feedback?.action_taken ? feedback?.action_taken : '-'}</td>

                                                    <td>
                                                        <div className="btn-group">
                                                            {
                                                                allPermissions.UpdateFeedBack && (
                                                                    <button onClick={() => handleUpdateSupport(feedback)} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                            {
                                                                allPermissions.DeleteFeedBack && (
                                                                    <button onClick={() => DeleteFeedbackFunc(feedback?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                        </div>
                                                    </td>

                                                    <Modal show={selectedFeedback !== null} onHide={handleCloseModal}>
                                                        <Modal.Header>
                                                            <Modal.Title>Update</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {
                                                                selectedFeedback && (
                                                                    <form method="post" onSubmit={UpdatedFeedbackFunction} className='p-2'>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Action Taken</label>
                                                                                    <input type="text" className="form-control" onChange={(event) => setActionTaken(event.target.value)} value={actionTaken} required />
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

export default AdminFeedback
