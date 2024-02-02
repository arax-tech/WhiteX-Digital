import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BaseURL } from '../../../redux/constants/BaseURL';

const Createcampaign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [campaignData, setCampaignData] = useState({
    title: "",
    body: "",
  });

  const [subject, setSubject] = useState('');
  const [type, setType] = useState('sms');
  const [file, setFile] = useState(null);

  const onDataChange = (event) => {
    if (event.target.name === "file") {
      setFile(event.target.files[0]);
    } else {
      setCampaignData({ ...campaignData, [event.target.name]: event.target.value })
    }
  }

  const changeSubject = (event) => {
    setSubject(event.target.value);
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const { loading, status, message, isAuthenticated, user, token } = useSelector((state) => state.auth);


  const apiUrl = `${BaseURL}/api/campaign/store`;

  const formData = new FormData();

  console.log(token)

  const CreateCampaignFunction = async (event) => {

    event.preventDefault();
    const headers = {
      'Authorization': `Bearer ${token}`,
      // Add any other headers as needed
    };

    try {

      formData.append('title', campaignData.title);
      formData.append('body', campaignData.body);
      formData.append('type', type);
      formData.append('file', file);
      type === 'email' ? formData.append('subject', subject) : null;

      const response = await axios.post(apiUrl, formData, { headers });
      // Handle the successful response here
      console.log('Data received:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
  }



  return (
    <div className="content-wrapper">
      <MetaData title="Admin - Create Client" />
      <div className="content-header row">
      </div>
      <div className="content-body">


        <div className="row" id="table-hover-row">
          <div className="col-12">
            <div className="card">
              <div className="card-header border-bottom ">
                <h4 className="card-title">Create Campaign </h4>
              </div>

              <form method="post" onSubmit={CreateCampaignFunction} className='p-2'>
                <div className='row'>
                  <div className='col'>
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input type="text" className="form-control" onChange={onDataChange} value={campaignData.title} name='title' required />
                    </div>
                  </div>
                  {
                    type === 'email' ? (
                      <div className='col'>
                        <div className="form-group">
                          <label className="form-label">Subject</label>
                          <input type="text" className="form-control" onChange={changeSubject} value={subject} name='subject' required />
                        </div>
                      </div>
                    ) : null
                  }
                  <div className='col'>
                    <div className="form-group">
                      <label className="form-label">Type</label>
                      <select
                        id="type"
                        className='form-control'
                        value={type}
                        onChange={handleTypeChange}
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-group">
                      <label>File</label>
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="file" onChange={onDataChange} name='file' />
                        <label className="custom-file-label" htmlFor="image">Choose File</label>
                      </div>
                    </div>
                  </div>

                </div>
                <div className='row'>
                  <div className='col'>
                    <div className="form-group">
                      <label className="form-label">Body</label>
                      <textarea className="form-control" onChange={onDataChange} value={campaignData.body} name='body' required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary" name="submit" value="Submit">Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Createcampaign
