import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Edit2, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAdminAction, GetAdminsAction } from '../../../redux/actions/Admin/AdminsAction';
import moment from 'moment'
import { toast } from 'react-toastify';
import { DELETE_ADMINS_RESET } from '../../../redux/constants/Admin/AdminsConstant';
import { UncombineAdminPermissions } from '../Permissions';
import $ from 'jquery';


const AdminAdmins = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { admins, isDeleted, message } = useSelector((state) => state.admins);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);


    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);

    useEffect(() => {
        if (allPermissions && !allPermissions.ReadAdmin) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetAdminsAction())

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_ADMINS_RESET })
        }

    }, [dispatch, isDeleted, message]);

    const DeleteAdmin = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteAdminAction(id));
        }
    }
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Admins" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Admins</h4>
                                {
                                    allPermissions.CreateAdmin && (
                                        <Link to={'/admin/admin/create'} className='btn btn-primary float-right'>Create</Link>
                                    )
                                }
                            </div>
                            <div>
                                <table className="table table-hover table-striped px-1">

                                    <thead>
                                        <tr>
                                            <th>Admin</th>
                                            <th>Email</th>
                                            <th>Designation</th>
                                            <th>RegisterAt</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            admins?.map((admin, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={admin?.image?.length > 0 ? admin?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                        <span className="font-weight-bold">{admin?.name}</span>
                                                    </td>
                                                    <td>{admin?.email}</td>
                                                    <td>{admin?.designation}</td>
                                                    <td>{moment(admin?.created_at).format('DD MMM yyyy, hh:mm A')}</td>

                                                    <td>
                                                        <div className="btn-group">
                                                            {
                                                                allPermissions.UpdateAdmin && (
                                                                    <Link to={`/admin/edit/admin/${admin?.id}`} className='btn btn-success btn-sm'>
                                                                        <Edit className='feather-icon-size-small mr-50' /><span className='pt-1'>Edit</span></Link>
                                                                )
                                                            }
                                                            {
                                                                allPermissions.DeleteAdmin && (
                                                                    <button onClick={() => DeleteAdmin(admin?.id)} className='btn btn-danger btn-sm'><Trash className='feather-icon-size-small mr-50' /><span className='pt-1'>Delete</span></button>
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

export default AdminAdmins
