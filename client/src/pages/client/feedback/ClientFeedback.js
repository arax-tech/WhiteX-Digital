import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';
import { UncombineClientPermissions } from '../Permissions';
import { CreateFeedbackAction, DeleteFeedbackAction, GetFeedbacksAction, UpdateFeedbackAction } from '../../../redux/actions/Client/FeedbackAction';
import { CREATE_FEEDBACK_RESET, DELETE_FEEDBACK_RESET, UPDATE_FEEDBACK_RESET } from '../../../redux/constants/Client/FeedbackConstant';
const ClientFeedback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, feedbacks, isCreated, isDeleted, isUpdated, message } = useSelector((state) => state.feedback);

    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);

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
    }, [dispatch]);


    // Create 
    const [createModal, setCreateModal] = useState(false);
    const [data, setData] = useState({
        title: '',
        description: '',
        ratings: '',
        category: '',
    })
    const InpChnage = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const CreateFeedbackFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("ratings", data.ratings);
        formData.append("category", data.category);
        await dispatch(CreateFeedbackAction(formData))
    }



    const DeleteFeedbackFunc = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteFeedbackAction(id));
        }
    }

    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [actionTaken, setActionTaken] = useState(null);

    const handleUpdateSupport = (feedback) => {
        setSelectedFeedback(feedback);
        setData({
            title: feedback?.title,
            description: feedback?.description,
            ratings: feedback?.ratings,
            category: feedback?.category,
        });
    };
    const handleCloseModal = () => {
        setSelectedFeedback(null);
    };

    const UpdatedFeedbackFunction = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("ratings", data.ratings);
        formData.append("category", data.category);
        await dispatch(UpdateFeedbackAction(selectedFeedback?.id, formData))
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: UPDATE_FEEDBACK_RESET })
            setSelectedFeedback(null);
        }
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_FEEDBACK_RESET })
            setCreateModal(false)
        }
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_FEEDBACK_RESET })
        }
        setData({
            title: '',
            description: '',
            ratings: '',
            category: '',
        });
        dispatch(GetFeedbacksAction())
    }, [dispatch, isCreated, isUpdated, isDeleted, message]);


    return (
        <div className="content-wrapper">
            <MetaData title="Client - Feedbacks" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Feedbacks</h4>
                                {
                                    allPermissions.CreateSupportTicket && (
                                        <button onClick={() => setCreateModal(true)} className='btn btn-primary float-right'>Create</button>
                                    )
                                }
                                <Modal show={createModal} onHide={() => setCreateModal(false)}>
                                    <Modal.Header>
                                        <Modal.Title>Create Support Ticket</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <form method="post" onSubmit={CreateFeedbackFunction}>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Title</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={data.title} name='title' required />

                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Category</label>
                                                        <select className="form-control" onChange={InpChnage} value={data.category} name='category' required>
                                                            <option value="">Choose...</option>
                                                            <option value="General">General</option>
                                                            <option value="Service">Service</option>
                                                            <option value="Product">Product</option>
                                                            <option value="Website">Website</option>
                                                        </select>

                                                    </div>
                                                </div>


                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Ratings</label>
                                                        <select className="form-control" onChange={InpChnage} value={data.ratings} name='ratings' required>
                                                            <option value="">Choose...</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Description</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={data.description} name='description' required />

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
                                                                    <form method="post" onSubmit={UpdatedFeedbackFunction}>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Title</label>
                                                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.title} name='title' required />

                                                                                </div>
                                                                            </div>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Category</label>
                                                                                    <select className="form-control" onChange={InpChnage} value={data.category} name='category' required>
                                                                                        <option value="">Choose...</option>
                                                                                        <option value="General">General</option>
                                                                                        <option value="Service">Service</option>
                                                                                        <option value="Product">Product</option>
                                                                                        <option value="Website">Website</option>
                                                                                    </select>

                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Ratings</label>
                                                                                    <select className="form-control" onChange={InpChnage} value={data.ratings} name='ratings' required>
                                                                                        <option value="">Choose...</option>
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                        <option value="5">5</option>
                                                                                    </select>

                                                                                </div>
                                                                            </div>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Description</label>
                                                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.description} name='description' required />

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

export default ClientFeedback
