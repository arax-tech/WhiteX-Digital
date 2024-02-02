import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { Edit, Trash, Eye, MessageSquare, XOctagon, Send } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

const ViewALLCampaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="content-wrapper">
      <MetaData title="Admin - Clients" />
      <div className="content-header row mb-3">
        <div className="col-lg-4 col-sm-6 col-12">

          <div className="card-header">
            <div className="d-flex flex-row justify-content-between">

              <div>
                <h2 className="font-weight-bolder mb-0">10</h2>
                <p className="card-text">Total</p>
              </div>
              <div className="avatar bg-light-primary p-50 m-0">
                <div className="avatar-content">
                  <MessageSquare className="font-medium-5" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-lg-4 col-sm-6 col-12">

          <div className="card-header">
            <div className="d-flex flex-row justify-content-between">

              <div>
                <h2 className="font-weight-bolder mb-0">10</h2>
                <p className="card-text">Fail</p>
              </div>
              <div className="avatar bg-light-primary  p-50 m-0">
                <div className="avatar-content">
                  <XOctagon className="font-medium-5" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-lg-4 col-sm-6 col-12">

          <div className="card-header">
            <div className="d-flex flex-row justify-content-between">
              <div>
                <h2 className="font-weight-bolder mb-0">10</h2>
                <p className="card-text">Send</p>
              </div>
              <div className="avatar bg-light-primary p-50 ms-auto">
                <div className="avatar-content">
                  <Send className="font-medium-5 " />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="content-body">


        <div className="row" id="table-hover-row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Report</h4>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Receiver</th>
                      <th>Status</th>
                      <th>Error Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td>
                        <span className="font-weight-bold">Usama</span>
                      </td>
                      <td>200</td>
                      <td>Success</td>


                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewALLCampaigns;
