import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import moment from 'moment'
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../Permissions';
import { DeleteClientAction, GetClientsAction } from '../../../redux/actions/Admin/ClientAction';
import { DELETE_CLIENT_RESET } from '../../../redux/constants/Admin/ClientConstant';
import $ from 'jquery';
const AdminClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, clients, isDeleted, message } = useSelector((state) => state.clients);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);

    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);

    useEffect(() => {
        if (allPermissions && !allPermissions.ReadClient) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);
    useEffect(() => {
        dispatch(GetClientsAction())

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_CLIENT_RESET })
        }

    }, [dispatch, isDeleted, message]);

    const DeleteClient = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteClientAction(id));
        }
    }
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Clients" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Clients</h4>
                                {
                                    allPermissions.CreateClient && (
                                        <Link to={'/admin/client/create'} className='btn btn-primary float-right'>Create</Link>
                                    )
                                }
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Email</th>
                                            <th>Designation</th>
                                            <th>RegisterAt</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clients?.map((client, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={client?.image?.length > 0 ? client?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                        <span className="font-weight-bold">{client?.name}</span>
                                                    </td>
                                                    <td>{client?.email}</td>
                                                    <td>{client?.designation}</td>
                                                    <td>{moment(client?.created_at).format('DD MMM yyyy, hh:mm A')}</td>

                                                    <td>
                                                        <div className="btn-group">
                                                            {
                                                                allPermissions.UpdateClient && (
                                                                    <Link to={`/admin/client/edit/${client?.id}`} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></Link>
                                                                )
                                                            }
                                                            {
                                                                allPermissions.DeleteClient && (
                                                                    <button onClick={() => DeleteClient(client?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
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

export default AdminClient
