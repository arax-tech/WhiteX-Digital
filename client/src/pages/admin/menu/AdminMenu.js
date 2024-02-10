import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UncombineAdminPermissions } from '../Permissions';
import { DeleteMenuAction, GetMenusAction } from '../../../redux/actions/Admin/MenuAction';
import { DELETE_MENU_RESET } from '../../../redux/constants/Admin/MenuConstant';
import $ from 'jquery';
const AdminMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, menus, isDeleted, message } = useSelector((state) => state.adminMenu);

    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);
    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);
    useEffect(() => {
        if (allPermissions && !allPermissions.ReadCustomMenu) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetMenusAction())
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_MENU_RESET })

        }

    }, [dispatch, isDeleted, message]);

    const DeleteMenuFunc = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteMenuAction(id));
        }
    }

    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Custom Solution" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Custom Solution</h4>
                                {
                                    allPermissions.CreateCustomMenu && (
                                        <Link to={'/admin/custom/menu/create'} className='btn btn-primary float-right'>Create</Link>
                                    )
                                }
                            </div>


                            <div className="table-responsive">
                                <table id='MyTable' className="table table-hover px-1">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Name</th>
                                            <th>Link</th>
                                            <th>Tooltip</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            menus?.map((menu, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={menu?.user?.image?.length > 0 ? menu?.user?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                        <span className="font-weight-bold">{menu?.user?.name}</span>
                                                    </td>
                                                    <td>{menu?.name}</td>
                                                    <td>{menu?.link}</td>
                                                    <td>{menu?.tooltip}</td>
                                                    <td>
                                                        {menu?.status === "Active" && (<span className='badge badge-pill badge-light-success  mr-1'>Active</span>)}
                                                        {menu?.status === "Disable" && (<span className='badge badge-pill badge-light-danger  mr-1'>Disable</span>)}
                                                    </td>

                                                    <td>
                                                        <div className="btn-group">
                                                            {
                                                                allPermissions.UpdateCustomMenu && (
                                                                    <Link to={`/admin/custom/menu/update/${menu?.id}`} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></Link>
                                                                )
                                                            }
                                                            {
                                                                allPermissions.DeleteFeedBack && (
                                                                    <button onClick={() => DeleteMenuFunc(menu?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
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

export default AdminMenu
