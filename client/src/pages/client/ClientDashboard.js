import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../../components/MetaData'
import { Gift, HelpCircle, Star, Users } from 'react-feather';
import { useSelector } from 'react-redux';
import { UncombineClientPermissions } from './Permissions';


const ClientDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineClientPermissions(user.permissions);
    return (
        <div className="content-wrapper">
            <MetaData title="Client - Dashboard" />
            <div className="content-header row">
            </div>
            <div className="content-body">
                <section id="statistics-card">


                    <div className="row">
                      
                        {
                            allPermissions.ReadTeam && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/admin/client' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">10</h2>
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
                                    <Link to='/admin/subscription' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">10</h2>
                                                <p className="card-text">Subscription</p>
                                            </div>
                                            <div className="avatar bg-light-primary p-50 m-0">
                                                <div className="avatar-content">
                                                    <Gift className="font-medium-5" />
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
                                    <Link to='/admin/support/ticket' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">10</h2>
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
                                    <Link to='/admin/feedback' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">10</h2>
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
