import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../../components/MetaData'
import { AlertTriangle, HelpCircle, Star, Users } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { UncombineClientPermissions } from './Permissions';
import { GetSubscriptionCancellationAction } from '../../redux/actions/Client/SubscriptionCancellationAction';
import { GetFeedbacksAction } from '../../redux/actions/Client/FeedbackAction';
import { GetSupportTicketsAction } from '../../redux/actions/Client/SupportAction';
import { GetTeamAction } from '../../redux/actions/Client/TeamAction';

const ClientDashboard = () => {
    const dispatch = useDispatch()

    const { user, PopupMessages } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);



    const { cancellations } = useSelector((state) => state.clientSubscriptionCancellations);
    const { feedbacks } = useSelector((state) => state.feedback);
    const { supports } = useSelector((state) => state.supports);
    const { teams } = useSelector((state) => state.teams);


    useEffect(() => {
        dispatch(GetTeamAction());
        dispatch(GetSubscriptionCancellationAction());
        dispatch(GetFeedbacksAction());
        dispatch(GetSupportTicketsAction());
    }, [dispatch]);

    return (
        <div className="content-wrapper">
            <MetaData title="Client - Dashboard" />
            <div className="content-header row">
            </div>
            <div className="content-body">
                <section id="statistics-card">
                    {
                        PopupMessages && PopupMessages?.map((message, index) => (
                            <div key={index} class="alert alert-warning" role="alert">
                                <h4 class="alert-heading p-1">Warning !</h4>
                                <p className='p-1'>{message?.content}</p>
                            </div>
                        ))


                    }
                    <div className="row">


                        {
                            allPermissions.ReadTeam && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/client/team' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{teams?.length}</h2>
                                                <p className="card-text">Teams</p>
                                            </div>
                                            <div className="avatar bg-light-primary p-50 m-0">
                                                <div className="avatar-content">
                                                    <Users className="font-medium-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            allPermissions.ReadSubscription && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/client/subscription/cancellation' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{cancellations?.length}</h2>
                                                <p className="card-text">Cancellation Req...</p>
                                            </div>
                                            <div className="avatar bg-light-primary p-50 m-0">
                                                <div className="avatar-content">
                                                    <AlertTriangle className="font-medium-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            allPermissions.ReadSupportTicket && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/client/support/ticket' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{supports?.length}</h2>
                                                <p className="card-text">Support Ticket</p>
                                            </div>
                                            <div className="avatar bg-light-primary p-50 m-0">
                                                <div className="avatar-content">
                                                    <HelpCircle className="font-medium-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            allPermissions.ReadFeedBack && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/client/feedback' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{feedbacks?.length}</h2>
                                                <p className="card-text">Feedback</p>
                                            </div>
                                            <div className="avatar bg-light-primary p-50 m-0">
                                                <div className="avatar-content">
                                                    <Star className="font-medium-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>




                </section>
            </div>
        </div>
    )
}

export default ClientDashboard
