import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { UncombineAdminPermissions } from '../Permissions';
import { Tab, Tabs } from 'react-bootstrap';
import moment from 'moment';
import { GetLeadsAction } from '../../../redux/actions/Admin/LeadAction';
import $ from 'jquery';
const AdminLeads = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { SubscriptionRegistrations, DigitalMarketingBundlePlans, FreeMarketingAnalysis, BookFreeStrategyCalls } = useSelector((state) => state.leads);
    const allPermissions = UncombineAdminPermissions(user.permissions);

    const [key, setKey] = useState('tab1');

    useEffect(() => {
        $('#MyTable').DataTable();
    }, []);



    useEffect(() => {
        if (allPermissions && !allPermissions.ReadLeadTracking) {
            alert("You don't have permission to access this resource...");
            navigate(-1)
        }
    }, [navigate, allPermissions]);

    useEffect(() => {
        dispatch(GetLeadsAction())
    }, [dispatch]);

    const SubscriptionRegistrationsFields = ['First Name', 'Last Name', 'Phone', 'Email', 'Company Name', 'Your Role', 'Company Website \/ URL', 'Total Ads Spend - USD', 'Select Subcription Package', 'Where did you heard about us?'];
    const DigitalMarketingBundlePlansFields = ['Text* Field (your-name)', 'Number* Field (yourPhoneNumber)', 'Email* Field (your-email)', 'Text* Field (yourCompanyName)', 'Url* Field (yourCompanyUrl)', 'Select* Field (yourRole)', 'Radio Field (yourLast90DaysAdSpend)', 'Select Field (referralSource)'];
    const FreeMarketingAnalysisFields = ['Full Name*', 'Phone number*', 'Email Address*', 'Company Name*', 'Company Website\/Facebook Page URL*'];
    const BookFreeStrategyCallsFields = ['Full Name*','Phone number*','Email Address*','Company Name*','Company Website\/Facebook Page URL*','Ad Spend in the Last 90 Days (Optional):)','Current Marketing Challenges','Acceptance Field'];

    return (
        <div className="content-wrapper">
            <MetaData title="Admin - Leads" />
            <div className="content-header row">
            </div>
            <div className="content-body">


                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <Tabs id="controlled-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                                <Tab eventKey="tab1" title="Subscription Registration Form">

                                    <div className="table-responsive">

                                        <table id='MTable' className="table table-hover px-1">
                                            <thead>
                                                <tr>
                                                    {
                                                        SubscriptionRegistrationsFields?.map((field, index) => (
                                                            <th key={index}>{field}</th>

                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    SubscriptionRegistrations?.map((registration, index) => (
                                                        <tr key={index}>
                                                            {registration.fields && JSON.parse(registration.fields) && (
                                                                SubscriptionRegistrationsFields.map((fieldName, fieldIndex) => {
                                                                    const field = Object.values(JSON.parse(registration.fields)).find(f => f.name === fieldName);
                                                                    return field ? (
                                                                        <React.Fragment key={fieldIndex}>
                                                                            <td>{field.value}</td>
                                                                        </React.Fragment>
                                                                    ) : null;
                                                                })
                                                            )}
                                                        </tr>
                                                    ))
                                                }



                                            </tbody>
                                        </table>
                                    </div>

                                </Tab>

                                <Tab eventKey="tab2" title="Digital Marketing Bundle Plan">

                                    <div className="table-responsive">

                                        <table id='MTable' className="table table-hover px-1">
                                            <thead>
                                                <tr>
                                                    <th>Full Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>Company Name</th>
                                                    <th>Company Url</th>
                                                    <th>Role</th>
                                                    <th>Last90DaysAdSpend</th>
                                                    <th>Source</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    DigitalMarketingBundlePlans?.map((registration, index) => (
                                                        <tr key={index}>
                                                            {registration.fields && JSON.parse(registration.fields) && (
                                                                DigitalMarketingBundlePlansFields.map((fieldName, fieldIndex) => {
                                                                    const field = Object.values(JSON.parse(registration.fields)).find(f => f.name === fieldName);
                                                                    return field ? (
                                                                        <React.Fragment key={fieldIndex}>
                                                                            <td>{field.value}</td>
                                                                        </React.Fragment>
                                                                    ) : null;
                                                                })
                                                            )}
                                                        </tr>
                                                    ))
                                                }



                                            </tbody>
                                        </table>
                                    </div>

                                </Tab>
                                <Tab eventKey="tab3" title="Free Marketing Analysis">

                                    <div className="table-responsive">

                                        <table id='MTable' className="table table-hover px-1">
                                            <thead>
                                                <tr>
                                                    {
                                                        FreeMarketingAnalysisFields?.map((field, index) => (
                                                            <th key={index}>{field}</th>

                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    FreeMarketingAnalysis?.map((registration, index) => (
                                                        <tr key={index}>
                                                            {registration.fields && JSON.parse(registration.fields) && (
                                                                FreeMarketingAnalysisFields.map((fieldName, fieldIndex) => {
                                                                    const field = Object.values(JSON.parse(registration.fields)).find(f => f.name === fieldName);
                                                                    return field ? (
                                                                        <React.Fragment key={fieldIndex}>
                                                                            <td>{field.value}</td>
                                                                        </React.Fragment>
                                                                    ) : null;
                                                                })
                                                            )}
                                                        </tr>
                                                    ))
                                                }



                                            </tbody>
                                        </table>
                                    </div>

                                </Tab>
                                <Tab eventKey="tab4" title="Book Free Strategy Call">

                                    <div className="table-responsive">

                                        <table id='MTable' className="table table-hover px-1">
                                            <thead>
                                                <tr>
                                                    {
                                                        BookFreeStrategyCallsFields?.map((field, index) => (
                                                            <th key={index}>{field}</th>

                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    BookFreeStrategyCalls?.map((registration, index) => (
                                                        <tr key={index}>
                                                            {registration.fields && JSON.parse(registration.fields) && (
                                                                BookFreeStrategyCallsFields.map((fieldName, fieldIndex) => {
                                                                    const field = Object.values(JSON.parse(registration.fields)).find(f => f.name === fieldName);
                                                                    return field ? (
                                                                        <React.Fragment key={fieldIndex}>
                                                                            <td>{field.value}</td>
                                                                        </React.Fragment>
                                                                    ) : null;
                                                                })
                                                            )}
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

export default AdminLeads
