import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import { toast } from 'react-toastify';
import { CreatePopupMessageAction } from '../../../redux/actions/Admin/PopupMessageAction';
import { CREATE_POPUP_MESSAGE_RESET } from '../../../redux/constants/Admin/PopupMessageConstant';
import { GetClientsAction } from '../../../redux/actions/Admin/ClientAction';


const AdminPopupMessageCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isCreated,  message } = useSelector((state) => state.popupMessages);
    const { clients } = useSelector((state) => state.clients);

    const [data, setData] = useState({
        client_id: '',
        content: '',
        trigger_event: '',
        visibility_start: '',
        visibility_end: '',
        status: '',
    })

    const InpChnage = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const CreatePMFunction = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("client_id", data.client_id);
        formData.append("content", data.content);
        formData.append("trigger_event", data.trigger_event);
        formData.append("visibility_start", data.visibility_start);
        formData.append("visibility_end", data.visibility_end);
        formData.append("status", data.status);
        await dispatch(CreatePopupMessageAction(formData))
    }
    useEffect(() => {
        dispatch(GetClientsAction())
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_POPUP_MESSAGE_RESET })
            navigate('/admin/popup/messages')
        }
    }, [dispatch, navigate, isCreated, message]);
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Create Popup Message" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header border-bottom ">
                                <h4 className="card-title">Create Popup Message </h4>
                            </div>

                            {
                                loading ? <LoadingTable /> : (
                                    <form method="post" onSubmit={CreatePMFunction} className='p-2'>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Client</label>
                                                    <select className="form-control" onChange={InpChnage} value={data.client_id} name='client_id' required>
                                                        <option value="">Choose...</option>
                                                        {
                                                            clients?.map((client, index) => (
                                                                <option key={index} value={client?.id}>{client?.name} -- {client?.email}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Content</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.content} name='content' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Trigger Event</label>
                                                    <select className="form-control" onChange={InpChnage} value={data.trigger_event} name='trigger_event' required>
                                                        <option value="">Choose...</option>
                                                        <option value="Login">Login</option>
                                                        <option value="Completing a Task">Completing a Task</option>
                                                        <option value="Billing">Billing</option>
                                                        <option value="Subscription Issue">Subscription Issue</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Visibility Start</label>
                                                    <input type="date" className="form-control" onChange={InpChnage} value={data.visibility_start} name='visibility_start' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Visibility End</label>
                                                    <input type="date" className="form-control" onChange={InpChnage} value={data.visibility_end} name='visibility_end' />
                                                </div>
                                            </div>  
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Status</label>
                                                    <select className="form-control" onChange={InpChnage} value={data.status} name='status' required>
                                                        <option value="">Choose...</option>
                                                        <option value="Active">Active</option>
                                                        <option value="InActive">InActive</option>
                                                        <option value="Scheduled">Scheduled</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                   

                                        <div className="row">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary" disabled={loading} name="submit" value="Submit">{loading ? 'Creating...' : 'Create'}</button>
                                            </div>
                                        </div>
                                    </form>
                                )
                            }

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AdminPopupMessageCreate
