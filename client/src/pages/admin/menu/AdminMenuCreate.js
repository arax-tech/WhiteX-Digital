import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import { toast } from 'react-toastify';
import { GetClientsAction } from '../../../redux/actions/Admin/ClientAction';
import { GetAdminsAction } from '../../../redux/actions/Admin/AdminsAction';
import { CreateMenuAction } from '../../../redux/actions/Admin/MenuAction';
import { CREATE_MENU_RESET } from '../../../redux/constants/Admin/MenuConstant';


const AdminMenuCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isCreated, message } = useSelector((state) => state.adminMenu);
    const { clients } = useSelector((state) => state.clients);
    const { admins } = useSelector((state) => state.admins);

    const [type, setType] = useState('Client');

    const [data, setData] = useState({
        user_id: '',
        name: '',
        link: '',
        tooltip: '',
        status: '',
    })

    const InpChnage = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const CreateMenuFunction = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("user_id", data.user_id);
        formData.append("name", data.name);
        formData.append("link", data.link);
        formData.append("tooltip", data.tooltip);
        formData.append("status", data.status);
        await dispatch(CreateMenuAction(formData))
    }
    useEffect(() => {
        dispatch(GetClientsAction())
        dispatch(GetAdminsAction())
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_MENU_RESET })
            navigate('/admin/custom/menu')
        }
    }, [dispatch, navigate, isCreated, message]);
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Create Custom Solution" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header border-bottom ">
                                <h4 className="card-title">Create Custom Solution </h4>
                            </div>

                            {
                                loading ? <LoadingTable /> : (
                                    <form method="post" onSubmit={CreateMenuFunction} className='p-2'>
                                        <div className='row'>



                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Menu For</label>
                                                    <select className="form-control" onChange={(event) => setType(event.target.value)} value={type} required>
                                                        <option value="">Choose...</option>
                                                        <option value="Client">Client</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                {
                                                    type === "Client" ? (
                                                        <div className="form-group">
                                                            <label className="form-label">Select Clients</label>
                                                            <select className="form-control" onChange={InpChnage} value={data.user_id} name='user_id' required>
                                                                <option value="">Choose...</option>
                                                                {
                                                                    clients?.map((client, index) => (
                                                                        <option key={index} value={client?.id}>{client?.name} -- {client?.email}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    ) : (
                                                        <div className="form-group">
                                                            <label className="form-label">Select Admins</label>
                                                            <select className="form-control" onChange={InpChnage} value={data.user_id} name='user_id' required>
                                                                <option value="">Choose...</option>
                                                                {
                                                                    admins?.map((admin, index) => (
                                                                        <option key={index} value={admin?.id}>{admin?.name} -- {admin?.email}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    )
                                                }

                                            </div>


                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Name</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.name} name='name' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Link</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.link} name='link' required />
                                                </div>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Tooltip</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.tooltip} name='tooltip' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Status</label>
                                                    <select className="form-control" onChange={InpChnage} value={data.status} name='status' required>
                                                        <option value="">Choose...</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Disable">Disable</option>
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

export default AdminMenuCreate
