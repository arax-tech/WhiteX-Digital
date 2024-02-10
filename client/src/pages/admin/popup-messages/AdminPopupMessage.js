import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../Permissions';
import { DeletePopupMessageAction, GetPopupMessagesAction } from '../../../redux/actions/Admin/PopupMessageAction';
import { DELETE_POPUP_MESSAGE_RESET } from '../../../redux/constants/Admin/PopupMessageConstant';
import $ from 'jquery';
const AdminPopupMessage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, popupMessages, isDeleted, message } = useSelector((state) => state.popupMessages);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);
    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);
    useEffect(() => {
        if (allPermissions && !allPermissions.ReadPopUpMessages) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetPopupMessagesAction())

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_POPUP_MESSAGE_RESET })
        }

    }, [dispatch, isDeleted, message]);

    const DeletePopupMessageFunc = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeletePopupMessageAction(id));
        }
    }
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Popup Messages" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Popup Messages</h4>
                                {
                                    allPermissions.CreatePopUpMessages && (
                                        <Link to={'/admin/popup/message/create'} className='btn btn-primary float-right'>Create</Link>
                                    )
                                }
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Content</th>
                                            <th>Trigger Event</th>
                                            <th>Visibility Start</th>
                                            <th>Visibility End</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            popupMessages?.map((message, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={message?.client?.image?.length > 0 ? message?.client?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                        <span className="font-weight-bold">{message?.client?.name}</span>
                                                    </td>
                                                    <td>{message?.content.substring(0, 35)}{message?.content.length > 35 ? "..." : "" }</td>
                                                    <td>{message?.trigger_event}</td>
                                                    <td>{message?.visibility_start ? moment(message?.visibility_start).format('DD MMM yyyy') : '-'}</td>
                                                    <td>{message?.visibility_end ? moment(message?.visibility_end).format('DD MMM yyyy') : '-'}</td>
                                                    <td>
                                                        {message?.status === "Active" && (<span className='badge badge-pill badge-light-success  mr-1'>Active</span>)}
                                                        {message?.status === "Scheduled" && (<span className='badge badge-pill badge-light-primary  mr-1'>Scheduled</span>)}
                                                        {message?.status === "InActive" && (<span className='badge badge-pill badge-light-danger  mr-1'>InActive</span>)}
                                                    </td>

                                                    <td>
                                                        <div className="btn-group">
                                                            {
                                                                allPermissions.UpdatePopUpMessages && (
                                                                    <Link to={`/admin/popup/message/update/${message?.id}`} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></Link>
                                                                )
                                                            }
                                                            {
                                                                allPermissions.DeletePopUpMessages && (
                                                                    <button onClick={() => DeletePopupMessageFunc(message?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
                                                                )
                                                            }
                                                        </div>
                                                    </td>
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

export default AdminPopupMessage
