import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import moment from 'moment'
import { toast } from 'react-toastify';
import { UncombineClientPermissions } from '../Permissions';
import { DeleteTeamAction, GetTeamAction } from '../../../redux/actions/Client/TeamAction';
import { DELETE_TEAM_RESET } from '../../../redux/constants/Client/TeamConstant';
const ClientTeam = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, teams, isDeleted, message } = useSelector((state) => state.teams);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);

    useEffect(() => {
        if (allPermissions && !allPermissions.ReadTeam) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);
    useEffect(() => {
        dispatch(GetTeamAction())

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_TEAM_RESET })
        }

    }, [dispatch, isDeleted, message]);

    const DeleteTeamFunction = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteTeamAction(id));
        }
    }
    return (
        <div className="content-wrapper">
            <MetaData title="Client - Teams" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Teams</h4>

                                {
                                    allPermissions.CreateTeam && (
                                        <Link to={'/client/team/create'} className='btn btn-primary float-right'>Create</Link>
                                    )
                                }

                            </div>

                            {
                                loading ? <LoadingTable /> : (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Team</th>
                                                    <th>Email</th>
                                                    <th>Designation</th>
                                                    <th>RegisterAt</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    teams?.map((team, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <img src={team?.image?.length > 0 ? team?.image : "/placeholder.jpg"} className="mr-75 img-thumbnail " height="40" width="40" alt="Angular" />
                                                                <span className="font-weight-bold">{team?.name}</span>
                                                            </td>
                                                            <td>{team?.email}</td>
                                                            <td>{team?.designation}</td>
                                                            <td>{moment(team?.created_at).format('DD MMM yyyy, hh:mm A')}</td>

                                                            <td>
                                                                <div className="btn-group">

                                                                    {
                                                                        allPermissions.UpdateTeam && (
                                                                            <Link to={`/client/team/edit/${team?.id}`} className='btn btn-success btn-sm'><Edit style={{ width: 14, height: 14 }} /></Link>
                                                                        )
                                                                    }
                                                                    {
                                                                        allPermissions.DeleteTeam && (
                                                                            <button onClick={() => DeleteTeamFunction(team?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
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
                                )
                            }

                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default ClientTeam
