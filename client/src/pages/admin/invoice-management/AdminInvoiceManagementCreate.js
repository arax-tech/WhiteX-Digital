import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import LoadingTable from '../../../components/LoadingTable'
import { toast } from 'react-toastify';
import { GetClientsAction } from '../../../redux/actions/Admin/ClientAction';
import { CreateInvoiceAction } from '../../../redux/actions/Admin/InvoiceAction';
import { CREATE_INVOICE_RESET } from '../../../redux/constants/Admin/InvoiceConstant';


const AdminInvoiceManagementCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isCreated, message } = useSelector((state) => state.invoices);
    const { clients } = useSelector((state) => state.clients);


    const [signature, setSignature] = useState();
    const [data, setData] = useState({
        client_id: '',
        issue_date: '',
        salesperson_name: '',
        payment_instructions: '',
        payment_links: '',
        subtotal: '',
        discount: '',
        tax: '',
        total: '',
        status: '',
        note: '',
    })

    const InpChnage = (event) => {
        if (event.target.name === "image") {
            setSignature(event.target.files[0]);
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }


    // eslint-disable-next-line
    const [rows, setRows] = useState([
        { name: "", description: "", cost: "", qty: "", price: "" }
    ]);

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { name: "", description: "", cost: "", qty: "", price: "" }]);
    };

    const handleRemoveRow = (index) => {
        if (rows.length > 1) {
            const updatedRows = [...rows];
            updatedRows.splice(index, 1);
            setRows(updatedRows);
        }
    };











    const CreateInvoiceFunction = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("client_id", data.client_id);
        formData.append("issue_date", data.issue_date);
        formData.append("salesperson_name", data.salesperson_name);
        formData.append("payment_instructions", data.payment_instructions);
        formData.append("payment_links", data.payment_links);
        formData.append("subtotal", data.subtotal);
        formData.append("discount", data.discount);
        formData.append("tax", data.tax);
        formData.append("total", data.total);
        formData.append("note", data.note);
        formData.append("status", data.status);
        formData.append("signature", signature);
        rows?.map(row => {
            formData.append('name[]', row.name);
            formData.append('description[]', row.description);
            formData.append('cost[]', row.cost);
            formData.append('qty[]', row.qty);
            formData.append('price[]', row.price);
        });

        console.log(data);
        console.log(signature);
        console.log(rows);
        await dispatch(CreateInvoiceAction(formData))
    }
    useEffect(() => {
        dispatch(GetClientsAction())
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: CREATE_INVOICE_RESET })
            navigate('/admin/invoice/management')
        }
    }, [dispatch, navigate, isCreated, message]);

    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Invoice Magement Create" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header border-bottom ">
                                <h4 className="card-title">Invoice Management Create </h4>
                            </div>

                            {
                                loading ? <LoadingTable /> : (
                                    <form method="post" onSubmit={CreateInvoiceFunction} className='p-2'>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Client</label>
                                                    <select className="form-control" onChange={InpChnage} value={data.client_id} name='client_id' required>
                                                        <option value="">Choose...</option>
                                                        {
                                                            clients?.map((client, index) => (
                                                                <option key={index} value={client?.id}>{client?.name} -- {client?.email}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Issue Date</label>
                                                    <input type="date" className="form-control" onChange={InpChnage} value={data.issue_date} name='issue_date' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">SalesPerson Name</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.salesperson_name} name='salesperson_name' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Payment Instructions</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.payment_instructions} name='payment_instructions' required />
                                                </div>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Payment Links</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.payment_links} name='payment_links' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Subtotal</label>
                                                    <input type="number" className="form-control" onChange={InpChnage} value={data.subtotal} name='subtotal' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Discount</label>
                                                    <input type="number" className="form-control" onChange={InpChnage} value={data.discount} name='discount' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Tax</label>
                                                    <input type="number" className="form-control" onChange={InpChnage} value={data.tax} name='tax' required />
                                                </div>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Total</label>
                                                    <input type="number" className="form-control" onChange={InpChnage} value={data.total} name='total' required />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Status</label>
                                                    <select className="form-control" onChange={InpChnage} value={data.status} name='status' required>
                                                        <option value="">Choose...</option>
                                                        <option value="Due">Due</option>
                                                        <option value="Paid">Paid</option>
                                                        <option value="Unpaid">Unpaid</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className="form-group">
                                                    <label className="form-label">Note</label>
                                                    <input type="text" className="form-control" onChange={InpChnage} value={data.note} name='note' required />
                                                </div>
                                            </div>


                                            <div className='col'>
                                                <div className="form-group">
                                                    <label>Signature</label>
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="image" onChange={InpChnage} name='image' />
                                                        <label className="custom-file-label" htmlFor="image">Choose Signature</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className='my-2'>Add Invoice Items</h4>

                                        {rows?.map((row, index) => {
                                            return (
                                                <div className='row' key={index}>
                                                    <div className='col'>
                                                        <div className="form-group">
                                                            <label className="form-label">Name</label>
                                                            <input type="text" className="form-control" onChange={(e) => handleInputChange(e, index)} value={row.name} name='name' required />
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <div className="form-group">
                                                            <label className="form-label">Description</label>
                                                            <input type="text" className="form-control" onChange={(e) => handleInputChange(e, index)} value={row.description} name='description' required />
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <div className="form-group">
                                                            <label className="form-label">Cost</label>
                                                            <input type="number" className="form-control" onChange={(e) => handleInputChange(e, index)} value={row.cost} name='cost' required />
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <div className="form-group">
                                                            <label className="form-label">Qty</label>
                                                            <input type="number" className="form-control" onChange={(e) => handleInputChange(e, index)} value={row.qty} name='qty' required />
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <div className="form-group">
                                                            <label className="form-label">Price</label>
                                                            <input type="number" className="form-control" onChange={(e) => handleInputChange(e, index)} value={row.price} name='price' required />
                                                        </div>
                                                    </div>
                                                    <div className='col'>
                                                        <div className="form-group">
                                                            <label className="form-label" style={{ color: 'transparent' }}>Add OR Remove</label>
                                                            <div class="btn-group text-center">
                                                                <button type="button" className="btn btn-success btn-rounded" onClick={handleAddRow}>Add</button>
                                                                <button type="button" className="btn btn-danger btn-rounded" onClick={() => handleRemoveRow(index)}>Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            );
                                        })}


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
        </div >
    )
}

export default AdminInvoiceManagementCreate
