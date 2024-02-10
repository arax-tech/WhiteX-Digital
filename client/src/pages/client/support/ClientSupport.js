import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, MessageCircle, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';
import { UncombineClientPermissions } from '../Permissions';
import { CreateSupportTicketAction, DeleteSupportTicketAction, GetSupportTicketsAction, UpdateSupportTicketAction } from '../../../redux/actions/Client/SupportAction';
import { CREATE_SUPPORT_RESET, DELETE_SUPPORT_RESET, UPDATE_SUPPORT_RESET } from '../../../redux/constants/Client/SupportConstant';
const ClientSupport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, supports, isCreated, isDeleted, isUpdated, message } = useSelector((state) => state.supports);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);

    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);
    useEffect(() => {
        if (allPermissions && !allPermissions.ReadSupportTicket) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetSupportTicketsAction())
    }, [dispatch]);




    // Create 
    const [createModal, setCreateModal] = useState(false);
    const [data, setData] = useState({
        title: '',
        message: '',
        department: '',
        priority: '',
        resolution_summary: '',
    })
    const InpChnage = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const CreateSupportFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("message", data.message);
        formData.append("department", data.department);
        formData.append("priority", data.priority);
        formData.append("resolution_summary", data.resolution_summary);
        await dispatch(CreateSupportTicketAction(formData))
    }


    // Update
    const [selectedSupport, setSelectedSupport] = useState(null);
    const handleUpdateSupport = (support) => {
        setSelectedSupport(support);
        setData({
            title: support?.title,
            message: support?.message,
            department: support?.department,
            priority: support?.priority,
            resolution_summary: support?.resolution_summary,
        });
    };
    const handleCloseModal = () => {
        setSelectedSupport(null);
    };

    const UpdatedSupportFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("message", data.message);
        formData.append("department", data.department);
        formData.append("priority", data.priority);
        formData.append("resolution_summary", data.resolution_summary);
        await dispatch(UpdateSupportTicketAction(selectedSupport?.id, formData))
    }

    // Delete 
    const DeleteSupportFunc = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteSupportTicketAction(id));
        }
    }
    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_SUPPORT_RESET })
            setSelectedSupport(null);
        }
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: UPDATE_SUPPORT_RESET })
            setCreateModal(false)
        }
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_SUPPORT_RESET })
        }
        setData({
            title: '',
            message: '',
            department: '',
            priority: '',
            resolution_summary: '',
        });
        dispatch(GetSupportTicketsAction())
    }, [dispatch, isCreated, isUpdated, isDeleted, message]);


    return (
        <div className="content-wrapper">
            <MetaData title="Client - Support Tickets" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Support Tickets</h4>
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

                                        <form method="post" onSubmit={CreateSupportFunction}>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Title</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={data.title} name='title' required />

                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Message</label>
                                                        <input type="text" className="form-control" onChange={InpChnage} value={data.message} name='message' required />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Department</label>
                                                        <select className="form-control" onChange={InpChnage} value={data.department} name='department' required>
                                                            <option value="">Choose...</option>
                                                            <option value="Technical Support">Technical Support</option>
                                                            <option value="Customer Service">Customer Service</option>
                                                            <option value="Billing Inquiries">Billing Inquiries</option>
                                                            <option value="Product Feedback">Product Feedback</option>
                                                            <option value="Sales Inquiry">Sales Inquiry</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Priority</label>
                                                        <select className="form-control" onChange={InpChnage} value={data.priority} name='priority' required>
                                                            <option value="">Choose...</option>
                                                            <option value="Low">Low</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="High">High</option>
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-group">
                                                        <label className="form-label">Resolution Summary</label>
                                                        <textarea placeholder='Brief description of the resolution or actions taken.' className="form-control" onChange={InpChnage} value={data.resolution_summary} name='resolution_summary' required></textarea>

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
                                            <th>Assign To</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Department</th>
                                            <th>Priority</th>
                                            <th>Resolution Summary</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            supports?.map((support, index) => (
                                                <tr key={index}>

                                                    <td>
                                                        {
                                                            support?.assigned ? (
                                                                <>
                                                                    <img src={support?.assigned?.image?.length > 0 ? support?.assigned?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                                    <span className="font-weight-bold">{support?.assigned?.name}</span>
                                                                </>

                                                            ) : 'Null'
                                                        }
                                                    </td>
                                                    <td>{support?.title}</td>
                                                    <td>{support?.message}</td>
                                                    <td>{support?.department}</td>
                                                    <td>{support?.priority}</td>
                                                    <td>{support?.resolution_summary}</td>
                                                    <td>
                                                        {support?.status === "Open" && (<span className='badge badge-pill badge-light-primary  mr-1'>Open</span>)}
                                                        {support?.status === "Pending" && (<span className='badge badge-pill badge-light-primary  mr-1'>Pending</span>)}
                                                        {support?.status === "Resolved" && (<span className='badge badge-pill badge-light-success  mr-1'>Resolved</span>)}
                                                        {support?.status === "Closed" && (<span className='badge badge-pill badge-light-danger  mr-1'>Closed</span>)}
                                                    </td>

                                                    <td>
                                                        <div className="btn-group">
                                                            {
                                                                allPermissions.UpdateSupportTicket && (
                                                                    <button onClick={() => handleUpdateSupport(support)} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                            <Link to={`/client/support/chat/${support?.id}`} className='btn btn-primary btn-sm'><MessageCircle style={{ width: 14, height: 14 }} /></Link>
                                                            {
                                                                allPermissions.DeleteSupportTicket && (
                                                                    <button onClick={() => DeleteSupportFunc(support?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                        </div>
                                                    </td>

                                                    <Modal show={selectedSupport !== null} onHide={handleCloseModal}>
                                                        <Modal.Header>
                                                            <Modal.Title>Update</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {
                                                                selectedSupport && (
                                                                    <form method="post" onSubmit={UpdatedSupportFunction}>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Title</label>
                                                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.title} name='title' required />

                                                                                </div>
                                                                            </div>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Message</label>
                                                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.message} name='message' required />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Department</label>
                                                                                    <select className="form-control" onChange={InpChnage} value={data.department} name='department' required>
                                                                                        <option value="">Choose...</option>
                                                                                        <option value="Technical Support">Technical Support</option>
                                                                                        <option value="Customer Service">Customer Service</option>
                                                                                        <option value="Billing Inquiries">Billing Inquiries</option>
                                                                                        <option value="Product Feedback">Product Feedback</option>
                                                                                        <option value="Sales Inquiry">Sales Inquiry</option>
                                                                                    </select>

                                                                                </div>
                                                                            </div>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Priority</label>
                                                                                    <select className="form-control" onChange={InpChnage} value={data.priority} name='priority' required>
                                                                                        <option value="">Choose...</option>
                                                                                        <option value="Low">Low</option>
                                                                                        <option value="Medium">Medium</option>
                                                                                        <option value="High">High</option>
                                                                                    </select>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Resolution Summary</label>
                                                                                    <textarea placeholder='Brief description of the resolution or actions taken.' className="form-control" onChange={InpChnage} value={data.resolution_summary} name='resolution_summary' required></textarea>

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

export default ClientSupport
