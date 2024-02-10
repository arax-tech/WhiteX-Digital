import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleInvoiceAction } from '../redux/actions/Admin/InvoiceAction';
import { Link, useParams } from 'react-router-dom';
import FullLoading from '../components/FullLoading';
import moment from 'moment';

const PrintInvoics = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { setting } = useSelector((state) => state.auth);
    console.log(setting);
    const { loading, invoice } = useSelector((state) => state.invoices);
    useEffect(() => {
        dispatch(GetSingleInvoiceAction(id));
    }, [dispatch, id]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.print();
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, []);


    return (
        loading ? <FullLoading /> :
            <div className="invoice-print p-5">

                <div className="d-flex justify-content-between flex-row">
                    <div className="mb-4">
                        <div className="d-flex svg-illustration mb-3 gap-2">
                            <div className="app-brand-logo demo">

                                <img width={150} src={setting?.invoice_logo} alt={setting?.company_name} />

                            </div>
                        </div>
                        <p className="mb-1">{setting?.address_1}</p>
                        <p className="mb-1">{setting?.address_2}</p>
                        <p className="mb-0">{setting?.phone1}, {setting?.phone2}</p>
                    </div>
                    <div className='mt-4'>
                        <h4 className="fw-medium">INVOICE #{invoice?.data?.id}</h4>
                        <div className="mb-2">
                            <span className="text-muted">Date Issues:</span>
                            <span className="fw-medium">{moment(invoice?.data?.issue_date).format('DD MMM yyyy')}</span>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between flex-row mb-4">
                    <div className="w-50">
                        <h6>Invoice To:</h6>
                        <p className="mb-0">{invoice?.client?.name}</p>
                        <p className="mb-0">{invoice?.client?.company_name}</p>
                        <p className="mb-0">{invoice?.client?.address_1}, {invoice?.client?.address_2}</p>
                        <p className="mb-0">{invoice?.client?.phone}</p>
                        <p className="mb-0">{invoice?.client?.email}</p>
                    </div>
                    <div className="w-50"></div>
                    <div className="w-50"></div>
                    <div className="w-50">
                        <h6>Bill To:</h6>
                        <p className="mb-0">{invoice?.client?.name}</p>
                        <p className="mb-0">{invoice?.client?.company_name}</p>
                        <p className="mb-0">{invoice?.client?.address_1}, {invoice?.client?.address_2}</p>
                        <p className="mb-0">{invoice?.client?.phone}</p>
                        <p className="mb-0">{invoice?.client?.email}</p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table m-0">
                        <thead className="table-light">
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Cost</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoice?.items?.map((item1, index) => (
                                    <tr key={index}>
                                        <td>{item1?.name}</td>
                                        <td>{item1?.description}</td>
                                        <td>৳{item1?.cost}.00</td>
                                        <td>{item1?.qty}</td>
                                        <td>৳{item1?.price}.00</td>
                                    </tr>
                                ))
                            }

                            <tr>
                                <td colspan="3" className="align-top px-4 py-3">
                                    <p className="mb-1">
                                        <span className="me-1 fw-medium"><b>Salesperson : </b></span>
                                        <span>{invoice?.data?.salesperson_name}</span>
                                    </p>
                                    <p className="mb-1">
                                        <span className="me-1 fw-medium"><b>Payment Instructions : </b></span>
                                        <span>{invoice?.data?.payment_instructions}</span>
                                    </p>
                                    <p className="mb-1">
                                        <span className="me-1 fw-medium"><b>Payment Link : </b></span>
                                        <Link to={invoice?.data?.payment_links} target='_blank'> {invoice?.data?.payment_links}</Link>
                                    </p>
                                    {/* <span>Thanks for your business</span> */}
                                    <p className="mt-3 mb-2">
                                        <img width={200} src={invoice?.data?.signature} alt='signature' />
                                    </p>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="mb-1">Subtotal : </p>
                                    <p className="mb-1">Discount:</p>
                                    <p className="mb-1">Tax:</p>
                                    <p className="mb-0">Total:</p>
                                </td>
                                <td className="px-4 py-3">
                                    <p className="fw-medium mb-1">৳ {invoice?.data?.subtotal}.00</p>
                                    <p className="fw-medium mb-1">৳ {invoice?.data?.discount}.00</p>
                                    <p className="fw-medium mb-1">৳ {invoice?.data?.tax}.00</p>
                                    <p className="fw-medium mb-0">৳ {invoice?.data?.total}.00</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <div className="col-12">
                        <span className="fw-medium">Note:</span>
                        <span>{invoice?.data?.note}</span>
                    </div>
                </div>
            </div>

    )
}

export default PrintInvoics
