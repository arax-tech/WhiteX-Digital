import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import { GetSubscriptionInvoicesAction } from '../../../redux/actions/Admin/SubscriptionAction';
import { UncombineAdminPermissions } from '../Permissions';
import { Tab, Tabs } from 'react-bootstrap';
import { Printer, Trash } from 'react-feather';
import moment from 'moment';
import { DeleteInvoiceAction, GetInvoicesAction } from '../../../redux/actions/Admin/InvoiceAction';
import { DELETE_INVOICE_RESET } from '../../../redux/constants/Admin/InvoiceConstant';
import { toast } from 'react-toastify';
import $ from 'jquery';
const AdminSubInvoics = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, invoices } = useSelector((state) => state.subscriptions);
    const { loading: invoicesLoading, invoices: customInvoices, isDeleted, message } = useSelector((state) => state.invoices);
    const { user } = useSelector((state) => state.auth);
    const allPermissions = UncombineAdminPermissions(user.permissions);

    const [key, setKey] = useState('tab1');
    
    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);

    useEffect(() => {
        $('#MyTable1').DataTable();
    }, []);
    useEffect(() => {
        if (allPermissions && !allPermissions.ReadInvoiceManagement) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetInvoicesAction())
        dispatch(GetSubscriptionInvoicesAction())
    }, [dispatch]);

    useEffect(() => {
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_INVOICE_RESET })
            dispatch(GetInvoicesAction())
        }
    }, [dispatch, isDeleted, message]);

    const DeleteInvoiceFunction = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(DeleteInvoiceAction(id));
        }
    }
    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Invoices" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <Tabs id="controlled-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="tab1" title="WooCommerce Invoices">

                                    <div className="card-header">
                                        <h4 className="card-title">WooCommerce Invoices</h4>
                                    </div>

                                    
                                            <div className="table-responsive">

                                                <table id='MyTable' className="table table-hover px-1">
                                                    <thead>
                                                        <tr>
                                                            {/* <th>Item</th> */}
                                                            <th>Billing Detail</th>
                                                            <th>Item</th>
                                                            <th>Status</th>
                                                            <th>Order Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            invoices?.map((invoice, index) => (
                                                                <tr key={index}>

                                                                    {/* <td>{invoice?.line_items[0]?.name}</td> */}
                                                                    <td>
                                                                        <b>Full Name : </b> {invoice?.billing?.first_name} {invoice?.billing?.last_name} <br />
                                                                        <b>Company : </b> {invoice?.billing?.company} <br />
                                                                        <b>Email : </b> {invoice?.billing?.email} <br />
                                                                        <b>Phone : </b> {invoice?.billing?.phone} <br />
                                                                        <b>City : </b> {invoice?.billing?.city} <br />
                                                                        <b>Country : </b> {invoice?.billing?.country} <br />
                                                                        <b>Full Address : </b> {invoice?.billing?.address_1}, {invoice?.billing?.address_2}<br />
                                                                    </td>
                                                                    <td>
                                                                        <b>Name : </b> {invoice?.line_items[0]?.name} <br />
                                                                        <b>Price : </b> {invoice?.line_items[0]?.price} <br />
                                                                        <b>Quantity : </b> {invoice?.line_items[0]?.quantity} <br />
                                                                    </td>
                                                                    <td><span className='badge badge-pill badge-light-success  mr-1'>Completed</span></td>
                                                                    <td>{invoice?.date_completed ? moment(invoice?.date_completed).format('DD MMM yyyy') : '-'}</td>
                                                                </tr>
                                                            ))
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>
                                        
                                </Tab>
                                <Tab eventKey="tab2" title="Custom Invocies">
                                    <div className="card-header">
                                        <h4 className="card-title">Custom Invoices</h4>
                                        {
                                            allPermissions.CreateInvoiceManagement && (
                                                <Link to={'/admin/invoice/management/create'} className='btn btn-primary float-right'>Create</Link>
                                            )
                                        }
                                    </div>

                                    
                                            <div className="table-responsive">

                                                <table id='MyTable1' className="table table-hover px-1">
                                                    <thead>
                                                        <tr>
                                                            {/* <th>Item</th> */}
                                                            <th>Client</th>
                                                            <th>Items</th>
                                                            <th>Status</th>
                                                            <th>Issue Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            customInvoices?.map((invoice, index) => (
                                                                <tr key={index}>

                                                                    {/* <td>{invoice?.line_items[0]?.name}</td> */}
                                                                    <td>
                                                                        <b>Name : </b>{invoice?.client?.name} <br />
                                                                        <b>Company : </b>{invoice?.client?.company} <br />
                                                                        <b>Email : </b>{invoice?.client?.email} <br />
                                                                        <b>Phone : </b>{invoice?.client?.phone} <br />
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            invoice?.items?.map((item, index) => (
                                                                                <span key={index}>{index + 1} : {item?.name},  {item?.qty} * {item?.qty * item?.price} <br /></span>
                                                                            ))
                                                                        }
                                                                    </td>

                                                                    <td>
                                                                        {invoice?.status === "Due" && (<span className='badge badge-pill badge-light-warning  mr-1'>Due</span>)}
                                                                        {invoice?.status === "Paid" && (<span className='badge badge-pill badge-light-success  mr-1'>Paid</span>)}
                                                                        {invoice?.status === "Unpaid" && (<span className='badge badge-pill badge-light-danger  mr-1'>Unpaid</span>)}
                                                                    </td>
                                                                    <td>{moment(invoice?.issue_date).format('DD MMM yyyy')}</td>
                                                                    <td>
                                                                        <div className="btn-group">
                                                                            {
                                                                                allPermissions.UpdateInvoiceManagement && (
                                                                                    <Link target='_blank' to={`/invoice/management/print/${invoice?.id}`} className='btn btn-success btn-sm'><Printer style={{ width: 14, height: 14 }} /></Link>
                                                                                )
                                                                            }
                                                                            {
                                                                                allPermissions.DeleteInvoiceManagement && (
                                                                                    <button onClick={() => DeleteInvoiceFunction(invoice?.id)} className='btn btn-danger btn-sm'><Trash style={{ width: 14, height: 14 }} /></button>
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
                                       

                                </Tab>
                            </Tabs>


                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AdminSubInvoics
