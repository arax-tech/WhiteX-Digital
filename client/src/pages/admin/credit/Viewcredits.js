import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash, Eye } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import MicroModal from 'micromodal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { BaseURL } from '../../../redux/constants/BaseURL';

const Viewcredits = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  // State Variables
  const [c_type, setC_type] = React.useState('email');
  const [user_id, setUser_id] = React.useState(3);
  const [type, setType] = React.useState('email');
  const [creditAmount, setCreditAmount] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  let demoCredits = [
    {
      "id": 6,
      "user_id": 2,
      "credits": 0,
      "type": "email",
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 7,
      "user_id": 2,
      "credits": 0,
      "type": "sms",
      "created_at": null,
      "updated_at": null
    },
    {
      "id": 8,
      "user_id": 2,
      "credits": 0,
      "type": "chatbot",
      "created_at": null,
      "updated_at": null
    }
  ];

  const [credits, setCredits] = React.useState(demoCredits);


  // Open and Close Modal
  const handleOpen = (c_type, uderid) => {
    setC_type(c_type);
    setUser_id(uderid);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const getapiUrl = `${BaseURL}/admin/client/credit`;
  
  const GetAllCredits = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      // Add any other headers as needed
    };

    try {
      // Make a GET request using Axios and await the response
      const response = await axios.get(getapiUrl, { headers });
      // Handle the successful response here
      console.log('Data received:', response.data);
      setCredits(response.data.credits);

    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
  }


  const apiUrl = `${BaseURL}/api/admin/client/editcredit`;

  const formData = new FormData();
  formData.set('user_id', user_id);
  formData.set('c_type', c_type);
  formData.set('type', type);
  formData.set('credit', creditAmount);

  // Add Credits Function 
  const AddCredits = async (event) => {
    event.preventDefault();
    const headers = {
      'Authorization': `Bearer ${token}`,
      // Add any other headers as needed
    };

    try {
      // Make a GET request using Axios and await the response
      const response = await axios.post(apiUrl, formData, { headers });

      // Handle the successful response here
      console.log('Data received:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }


  }


  useEffect(() => {
    GetAllCredits();
  }, []);



  return (
    <>
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Input Credit
            </Typography>
            <form method="post" onSubmit={AddCredits} className='p-2'>
              <div className="row">
                <div className='col'>
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                      id="type"
                      className='form-control'
                    >
                      <option value="email">Add</option>
                      <option value="sms">Subtract</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className="form-group">
                    <label className="form-label">Input Amount of Credit</label>
                    <input type="number" className="form-control" name='title' required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary" onClick={AddCredits} name="submit" value="Submit">Update</button>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="content-wrapper">
        <MetaData title="Admin - Clients" />
        <div className="content-header row">
        </div>
        <div className="content-body">


          <div className="row" id="table-hover-row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Credit</h4>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Credit</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        credits.length > 0 ? credits.map((credit, index) => (
                          <tr key={index}>
                            <td>
                              <span className="font-weight-bold">{credit.type}</span>
                            </td>
                            <td>{credit.credits}</td>
                            <td>
                              <span>
                                <button type="button" data-micromodal-trigger="modal-1" onClick={() => handleOpen(credit.type, credit.user_id)} class="btn btn-primary">
                                  <Edit size={15} />
                                </button>
                              </span>
                            </td>
                          </tr>
                        )) : null
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Viewcredits;
