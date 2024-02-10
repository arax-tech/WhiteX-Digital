import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../../components/MetaData'
import { AlertTriangle, Box, DollarSign, Gift, HelpCircle, Pocket, Star, TrendingUp, User, Users } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { UncombineAdminPermissions } from './Permissions';

import { GetAdminsAction } from '../../redux/actions/Admin/AdminsAction';
import { GetClientsAction } from '../../redux/actions/Admin/ClientAction';
import { GetSubscriptionAction } from '../../redux/actions/Admin/SubscriptionAction';
import { GetSubscriptionCancellationAction } from '../../redux/actions/Admin/SubscriptionCancellationAction';
import { cancellations } from '../../redux/actions/Admin/SubscriptionCancellationAction';
import { GetInvoicesAction } from '../../redux/actions/Admin/InvoiceAction';
import { GetFeedbacksAction } from '../../redux/actions/Admin/FeedbackAction';
import { GetSupportTicketsAction } from '../../redux/actions/Admin/SupportTicketAction';
import LoadingTable from '../../components/LoadingTable';

import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import Chart from 'react-apexcharts';

const AdminDashboard = () => {
    // const dispatch = useDispatch()

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = "/app-assets/vendors/js/vendors.min.js";
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = "/app-assets/vendors/js/charts/apexcharts.min.js";
        document.body.appendChild(script2);

        const script3 = document.createElement('script');
        script3.src = "/app-assets/js/scripts/pages/dashboard-ecommerce.js";
        document.body.appendChild(script3);

        const script4 = document.createElement('script');
        script4.src = "/app-assets/js/core/app.js";
        document.body.appendChild(script4);





        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
            document.body.removeChild(script3);
            document.body.removeChild(script4);
        };
    }, []);

    // const { user } = useSelector((state) => state.auth);
    // const { loading, admins } = useSelector((state) => state.admins);
    // const { clients } = useSelector((state) => state.clients);
    // const { subscriptions } = useSelector((state) => state.subscriptions);
    // const { cancellations } = useSelector((state) => state.subscriptionCancellations);
    // const { invoices } = useSelector((state) => state.invoices);
    // const { feedbacks } = useSelector((state) => state.adminFeedback);
    // const { supports } = useSelector((state) => state.supportTickets);

    // const allPermissions = UncombineAdminPermissions(user.permissions);

    // useEffect(() => {
    //     dispatch(GetAdminsAction());
    //     dispatch(GetClientsAction());
    //     dispatch(GetSubscriptionAction());
    //     dispatch(GetSubscriptionCancellationAction());
    //     dispatch(GetInvoicesAction());
    //     dispatch(GetFeedbacksAction());
    //     dispatch(GetSupportTicketsAction());
    // }, [dispatch]);

    // console.log(subscriptions);

    // const pendingCancel = subscriptions?.filter(subscription => subscription.status === "pending-cancel");
    // const onHold = subscriptions?.filter(subscription => subscription.status === "on-hold");
    // const active = subscriptions?.filter(subscription => subscription.status === "active");
    // const cancelled = subscriptions?.filter(subscription => subscription.status === "cancelled");
    // const expired = subscriptions?.filter(subscription => subscription.status === "expired");

    // Data for the chart
    const options = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        fill: {
            colors: ['#7367F0'],
        },
        dataLabels: {
            enabled: false,
        },
        title: {
            text: 'Monthly Budget',
        },
    };

    const series = [{
        name: 'Budget',
        data: [500, 600, 700, 800, 900, 1000, 1100],
    }];


    // Yearly Sales
    const YearlySales = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Yearly Sales',
                data: [65, 59, 80, 81, 56, 55, 40, 70, 89, 90, 100, 120],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };





    // Weekly Sales
    const WeeklySalesData = {
        labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'],
        datasets: [
            {
                label: 'Weekly Sales',
                data: [1, 2, 3, 4, 5],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const WeeklySaleOptions = {
        scales: {
            y: { beginAtZero: true, },
        },
    };



    const SubScriptionData = {
        labels: ['Cancelled', 'Expired', 'On Hold', 'Active', 'Pending Cancel'],
        datasets: [
            {
                label: 'Subscription ',
                data: [1, 0, 1, 1, 1],
                backgroundColor: [
                    '#EA5455',
                    '#00CFE8',
                    '#FF9F43',
                    '#28C76F',
                    '#82868B',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Dashboard" />
            <div className="content-header row">
            </div>
            <div className="content-body">
                {/* <section id="statistics-card">




                    <div className="row">
                        {
                            allPermissions.ReadAdmin && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/admin/admin' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{admins?.length}</h2>
                                                <p className="card-text">Admins</p>
                                            </div>
                                            <div className="avatar bg-light-primary p-50 m-0">
                                                <div className="avatar-content">
                                                    <User className="font-medium-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            allPermissions.ReadClient && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/admin/client' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{clients?.length}</h2>
                                                <p className="card-text">Clients</p>
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
                                                <h2 className="font-weight-bolder mb-0">{subscriptions?.length}</h2>
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
                            allPermissions.ReadCancellationRequests && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/admin/cancellation/requests' className="card">
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





                    </div>


                    <div className="row">
                        {
                            allPermissions.ReadBillingInformation && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/admin/billing/information' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{subscriptions?.length}</h2>
                                                <p className="card-text">Billings</p>
                                            </div>
                                            <div className="avatar bg-light-primary p-50 m-0">
                                                <div className="avatar-content">
                                                    <User className="font-medium-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                        {
                            allPermissions.ReadInvoiceManagement && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/admin/invoice/management' className="card">
                                        <div className="card-header">
                                            <div>
                                                <h2 className="font-weight-bolder mb-0">{invoices?.length}</h2>
                                                <p className="card-text">Invoices</p>
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
                            allPermissions.ReadSupportTicket && (
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <Link to='/admin/support/ticket' className="card">
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
                                    <Link to='/admin/feedback' className="card">
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

                    <div className='row'>
                        <div className="col-lg-6 col-12">
                            <div className="col-lg-12 col-12 p-0">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between pb-0">
                                        <h4 className="card-title">Weekly Sales</h4>

                                    </div>
                                    <div className="card-body">
                                        <Bar data={WeeklySalesData} options={WeeklySaleOptions} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-12 p-0">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between pb-0">
                                        <h4 className="card-title">Yearly Sales</h4>

                                    </div>
                                    <div className="card-body">
                                        <Line data={YearlySales} />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-6 col-12">
                            <div className="card" style={{minHeight:'96.3%'}}>
                                <div className="card-header d-flex justify-content-between pb-0">
                                    <h4 className="card-title">Subscriptions</h4>

                                </div>
                                <div className="card-body">
                                    <Pie data={SubScriptionData} />
                                </div>
                            </div>
                        </div>
                    </div>




                </section> */}
                <section id="dashboard-ecommerce">
                    <div className="row match-height">
                        <div className="col-xl-4 col-md-6 col-12">
                            <div className="card card-congratulation-medal">
                                <div className="card-body">
                                    <h5>Congratulations 🎉 John!</h5>
                                    <p className="card-text font-small-3">You have won gold medal</p>
                                    <h3 className="mb-75 mt-2 pt-50">
                                        <a href="javascript:void(0);">$48.9k</a>
                                    </h3>
                                    <button type="button" className="btn btn-primary">View Sales</button>
                                    <img src="/app-assets/images/illustration/badge.svg" className="congratulation-medal" alt="Medal Pic" />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8 col-md-6 col-12">
                            <div className="card card-statistics">
                                <div className="card-header">
                                    <h4 className="card-title">Statistics</h4>
                                    <div className="d-flex align-items-center">
                                        {/* <p className="card-text font-small-2 mr-25 mb-0">Updated 1 month ago</p> */}
                                    </div>
                                </div>
                                <div className="card-body statistics-body">
                                    <div className="row">
                                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                                            <div className="media">
                                                <div className="avatar bg-light-primary mr-2">
                                                    <div className="avatar-content">
                                                        <TrendingUp className="avatar-icon feather-icon-dashboard" />
                                                    </div>
                                                </div>
                                                <div className="media-body my-auto">
                                                    <h4 className="font-weight-bolder mb-0">230k</h4>
                                                    <p className="card-text font-small-3 mb-0">Sales</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                                            <div className="media">
                                                <div className="avatar bg-light-info mr-2">
                                                    <div className="avatar-content">
                                                        <User className="avatar-icon feather-icon-dashboard" />
                                                    </div>
                                                </div>
                                                <div className="media-body my-auto">
                                                    <h4 className="font-weight-bolder mb-0">8.549k</h4>
                                                    <p className="card-text font-small-3 mb-0">Customers</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                                            <div className="media">
                                                <div className="avatar bg-light-danger mr-2">
                                                    <div className="avatar-content">
                                                        <Box className="avatar-icon feather-icon-dashboard" />
                                                    </div>
                                                </div>
                                                <div className="media-body my-auto">
                                                    <h4 className="font-weight-bolder mb-0">1.423k</h4>
                                                    <p className="card-text font-small-3 mb-0">Products</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6 col-12">
                                            <div className="media">
                                                <div className="avatar bg-light-success mr-2">
                                                    <div className="avatar-content">
                                                        <DollarSign className="avatar-icon feather-icon-dashboard" />
                                                    </div>
                                                </div>
                                                <div className="media-body my-auto">
                                                    <h4 className="font-weight-bolder mb-0">$9745</h4>
                                                    <p className="card-text font-small-3 mb-0">Revenue</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row match-height">
                        <div className="col-lg-4 col-12">
                            <div className="row match-height">
                                <div className="col-lg-6 col-md-3 col-6">
                                    <div className="card">
                                        <div className="card-body pb-50">
                                            <h6>Orders</h6>
                                            <h2 className="font-weight-bolder mb-1">2,76k</h2>
                                            <div id="statistics-order-chart"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-3 col-6">
                                    <div className="card card-tiny-line-stats">
                                        <div className="card-body pb-50">
                                            <h6>Profit</h6>
                                            <h2 className="font-weight-bolder mb-1">6,24k</h2>
                                            <div id="statistics-profit-chart"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-6 col-12">
                                    <div className="card earnings-card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h4 className="card-title mb-1">Earnings</h4>
                                                    <div className="font-small-2">This Month</div>
                                                    <h5 className="mb-1">$4055.56</h5>
                                                    <p className="card-text text-muted font-small-2">
                                                        <span className="font-weight-bolder">68.2%</span><span> more earnings than last month.</span>
                                                    </p>
                                                </div>
                                                <div className="col-6">
                                                    <div id="earnings-chart"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-8 col-12">
                            <div class="card card-revenue-budget">
                                <div class="row mx-0">
                                    <div class="col-md-8 col-12 revenue-report-wrapper">
                                        <div class="d-sm-flex justify-content-between align-items-center mb-3">
                                            <h4 class="card-title mb-50 mb-sm-0">Revenue Report</h4>
                                            <div class="d-flex align-items-center">
                                                <div class="d-flex align-items-center mr-2">
                                                    <span class="bullet bullet-primary font-small-3 mr-50 cursor-pointer"></span>
                                                    <span>Earning</span>
                                                </div>
                                                <div class="d-flex align-items-center ml-75">
                                                    <span class="bullet bullet-warning font-small-3 mr-50 cursor-pointer"></span>
                                                    <span>Expense</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="revenue-report-chart"></div>
                                    </div>
                                    <div class="col-md-4 col-12 budget-wrapper">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-outline-primary btn-sm dropdown-toggle budget-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                2020
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="javascript:void(0);">2020</a>
                                                <a class="dropdown-item" href="javascript:void(0);">2019</a>
                                                <a class="dropdown-item" href="javascript:void(0);">2018</a>
                                            </div>
                                        </div>
                                        <h2 class="mb-25">$25,852</h2>
                                        <div class="d-flex justify-content-center">
                                            <span class="font-weight-bolder mr-25">Budget:</span>
                                            <span>56,800</span>
                                        </div>
                                        <div id="budget-chart"></div>
                                        <button type="button" class="btn btn-primary">Increase Budget</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row match-height">
                        <div className="col-lg-8 col-12">
                            <div className="card card-company-table">
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Company</th>
                                                    <th>Item</th>
                                                    <th>Start / End</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar rounded">
                                                                <div className="avatar-content">
                                                                    <img src="/app-assets/images/icons/toolbox.svg" alt="Toolbar svg" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-weight-bolder">Dixons</div>
                                                                <div className="font-small-2 text-muted">meguc@ruj.io</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>Arham Khan </td>

                                                    <td>01 Feb 2024 / 01 Mar 2024</td>
                                                    <td>25000</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="card card-transaction">
                                <div className="card-header">
                                    <h4 className="card-title">Transactions</h4>
                                    <div className="dropdown chart-dropdown">
                                        <i data-feather="more-vertical" className="font-medium-3 cursor-pointer" data-toggle="dropdown"></i>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                                            <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
                                            <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="transaction-item">
                                        <div className="media">
                                            <div className="avatar bg-light-primary rounded">
                                                <div className="avatar-content">
                                                    <Pocket className="avatar-icon font-medium-3 feather-icon-dashboard" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="transaction-title">Wallet</h6>
                                                <small>Starbucks</small>
                                            </div>
                                        </div>
                                        <div className="font-weight-bolder text-success">2500</div>
                                    </div>
                                    <div className="transaction-item">
                                        <div className="media">
                                            <div className="avatar bg-light-primary rounded">
                                                <div className="avatar-content">
                                                    <Pocket className="avatar-icon font-medium-3 feather-icon-dashboard" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="transaction-title">Wallet</h6>
                                                <small>Starbucks</small>
                                            </div>
                                        </div>
                                        <div className="font-weight-bolder text-success">2500</div>
                                    </div>
                                    <div className="transaction-item">
                                        <div className="media">
                                            <div className="avatar bg-light-primary rounded">
                                                <div className="avatar-content">
                                                    <Pocket className="avatar-icon font-medium-3 feather-icon-dashboard" />
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="transaction-title">Wallet</h6>
                                                <small>Starbucks</small>
                                            </div>
                                        </div>
                                        <div className="font-weight-bolder text-success">2500</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdminDashboard
