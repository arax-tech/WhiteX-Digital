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

const Adminconfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (type) => {
    setType(type);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const [type, setType] = React.useState('email');
  const [emailapikey, setEmailapikey] = React.useState('');
  const [smsapikey, setSmsapikey] = React.useState('');

  const onDataChange = (event) => {
    if (event.target.name === 'emailapikey') {
      setEmailapikey(event.target.value);
    }
    if (event.target.name === 'smsapikey') {
      setSmsapikey(event.target.value);
    }
  }

  const { token } = useSelector((state) => state.auth);



  const apiUrl = `${BaseURL}/api/admin/config/api`;
  const CreateApiKey = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('type', type);
    type === 'email' ? formData.append('emailapikey', emailapikey) : formData.append('smsapikey', smsapikey);


    const headers = {
      'Authorization': `Bearer ${token}`,
      // Add any other headers as needed
    };

    try {

      const response = await axios.post(apiUrl, formData, { headers });
      // Handle the successful response here
      console.log('Data received:', response.data);
      handleClose();
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
      handleClose();
    }

  }

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
              Input API Key
            </Typography>
            <form method="post" onSubmit={CreateApiKey} className='p-2'>
              {/* <div className="row">
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
              </div> */}

              {
                type === 'email' ? (
                  <div className='row'>
                    <div className='col'>
                      <div className="form-group">
                        <label className="form-label">Enter Api key (Email)</label>
                        <input type="text" name='emailapikey' className="form-control" onChange={onDataChange} value={emailapikey} required
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='row'>
                    <div className='col'>
                      <div className="form-group">
                        <label className="form-label">Enter Api key (SMS)</label>
                        <input type="text" name='smsapikey' className="form-control" onChange={onDataChange} value={smsapikey} required
                        />
                      </div>
                    </div>
                  </div>
                )

              }
              

              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary" onClick={CreateApiKey}  name="submit" value="Submit">Update</button>
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
                  <h4 className="card-title">Config</h4>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        <td>
                          <span className="font-weight-bold">Email</span>
                        </td>
                        <td>
                          <span>
                            <button type="button" data-micromodal-trigger="modal-1" onClick={() => { handleOpen("email") }} class="btn btn-primary">
                              <Edit size={15} />
                            </button>
                          </span>
                        </td>
                      </tr>
                      <tr >
                        <td>
                          <span className="font-weight-bold">SMS</span>
                        </td>
                        <td>
                          <span>
                            <button type="button" data-micromodal-trigger="modal-1" onClick={() => { handleOpen("sms") }} class="btn btn-primary">
                              <Edit size={15} />
                            </button>
                          </span>
                        </td>
                      </tr>
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

export default Adminconfig;
