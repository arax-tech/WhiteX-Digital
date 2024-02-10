import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, MessageCircle, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../Permissions';
import { DeleteSupportTicketAction, GetSupportTicketsAction, UpdateSupportTicketAction } from '../../../redux/actions/Admin/SupportTicketAction';
import { DELETE_SUPPORT_RESET, UPDATE_SUPPORT_RESET } from '../../../redux/constants/Admin/SupportTicketConstant';
import { Modal } from 'react-bootstrap';
import { GetAdminsAction } from '../../../redux/actions/Admin/AdminsAction';
import $ from 'jquery';
const AdminSupport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, supports, isDeleted, isUpdated, message } = useSelector((state) => state.supportTickets);
    const { admins } = useSelector((state) => state.admins);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);

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
        dispatch(GetAdminsAction())

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_SUPPORT_RESET })
        }

    }, [dispatch, isDeleted, message]);

    const DeleteSupportFunc = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteSupportTicketAction(id));
        }
    }

    const [selectedSupport, setSelectedSupport] = useState(null);
    const [status, setStatus] = useState(null);
    const [assignedTo, setAssignedTo] = useState(null);
    const handleUpdateSupport = (support) => {
        setSelectedSupport(support);
        setStatus(support?.status);
    };
    const handleCloseModal = () => {
        setSelectedSupport(null);
    };

    const UpdatedSupportFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("status", status);
        formData.append("assigned_to", assignedTo);
        await dispatch(UpdateSupportTicketAction(selectedSupport?.id, formData))
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: UPDATE_SUPPORT_RESET })
            setSelectedSupport(null);
            dispatch(GetSupportTicketsAction())
        }
    }, [dispatch, isUpdated, message]);


    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Support Tickets" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Support Tickets</h4>
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
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
                                                        <img src={support?.client?.image?.length > 0 ? support?.client?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                        <span className="font-weight-bold">{support?.client?.name}</span>
                                                    </td>
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
                                                            <Link to={`/admin/support/chat/${support?.id}`} className='btn btn-primary btn-sm'><MessageCircle style={{ width: 14, height: 14 }} /></Link>
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
                                                                    <form method="post" onSubmit={UpdatedSupportFunction} className='p-2'>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Assign To</label>
                                                                                    <select className="form-control" onChange={(event) => setAssignedTo(event.target.value)} value={assignedTo} required>
                                                                                        <option value="">Choose...</option>
                                                                                        {
                                                                                            admins?.map((admin, index) => (
                                                                                                <option key={index} value={admin?.id}>{admin?.name} -- {admin?.email}</option>
                                                                                            ))
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col'>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Select Status</label>
                                                                                    <select className="form-control" onChange={(event) => setStatus(event.target.value)} value={status}>
                                                                                        <option value="Open">Open</option>
                                                                                        <option value="Pending">Pending</option>
                                                                                        <option value="Resolved">Resolved</option>
                                                                                        <option value="Closed">Closed</option>
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

export default AdminSupport
