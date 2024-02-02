import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash, Eye } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BaseURL } from '../../../redux/constants/BaseURL';
import { Button } from 'react-bootstrap';



const ViewALLCampaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [campaigns, setCampaigns] = useState([]);

  const apiUrl = `${BaseURL}/api/campaign`;

  const GetAllCampaigns = async (event) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      // Add any other headers as needed
    };

    try {
      // Make a GET request using Axios and await the response
      const response = await axios.get(apiUrl, { headers });

      // Handle the successful response here
      console.log('Data received:', response.data);
      setCampaigns(response.data.campaign);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }

  }

  const DeleteCampaign = async (id) => {

    const deleteapiUrl = `${BaseURL}/api/campaign/delete/${id}`;

    const headers = {
      'Authorization': `Bearer ${token}`,
      // Add any other headers as needed
    };

    try {
      // Make a GET request using Axios and await the response
      const response = await axios.post(deleteapiUrl, { headers });

      // Handle the successful response here
      console.log('Data received:', response.data);
      setCampaigns(response.data.campaign);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    GetAllCampaigns();
  }, []);

  console.log(campaigns);


  return (
    <div className="content-wrapper">
      <MetaData title="Admin - Clients" />
      <div className="content-header row">
      </div>
      <div className="content-body">


        <div className="row" id="table-hover-row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Campaigns</h4>
                <Link to={'/admin/campaign/create'} className='btn btn-primary float-right'>Create</Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Body</th>
                      <th>Progress</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      campaigns.map((campaign) => (
                        <tr key={campaign._id}>
                          <td>{campaign.title}</td>
                          <td>{campaign.type}</td>
                          <td>{campaign.body}</td>
                          <td>{campaign.rate}</td>
                          <td>
                            <Link to={`/admin/campaign/view/${campaign._id}`} className='btn btn-primary btn-sm mr-1'><Eye size={15} /></Link>
                            <Button className='btn btn-danger btn-sm mr-1' onClick={() => DeleteCampaign(campaign.id)}  ><Trash size={15} /></Button>
                          </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ViewALLCampaigns;
