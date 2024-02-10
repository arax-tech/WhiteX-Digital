import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { AuthUserAction } from './redux/actions/AuthAction'
import Store from './redux/Store'

// Middlewares
import Admin from '../src/middlewares/Admin'
import Client from '../src/middlewares/Client'

// Auth
import Login from './pages/auth/Login'
import Verify from './pages/auth/Verify'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import SetPassword from './pages/auth/SetPassword'

// Layoust
import AdminLayout from './pages/admin/layouts/AdminLayout'
import ClientLayout from './pages/client/layouts/ClientLayout'

// Admins
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProfile from './pages/admin/AdminProfile'
import AdminPassword from './pages/admin/AdminPassword'


import AdminAdmins from './pages/admin/admins/AdminAdmins'

import PageNotFound from './pages/admin/PageNotFound'
import AdminAdminUpdate from './pages/admin/admins/AdminAdminUpdate'
import AdminSubscription from './pages/admin/subscription/AdminSubscription'
import AdminAdminCreate from './pages/admin/admins/AdminAdminCreate'
import AdminClient from './pages/admin/client/AdminClient'
import AdminClientCreate from './pages/admin/client/AdminClientCreate'
import AdminClientUpdate from './pages/admin/client/AdminClientUpdate'

import ClientDashboard from './pages/client/ClientDashboard'
import ClientProfile from './pages/client/ClientProfile'
import ClientPassword from './pages/client/ClientPassword'
import ClientTeam from './pages/client/team/ClientTeam'
import ClientTeamCreate from './pages/client/team/ClientTeamCreate'
import ClientTeamUpdate from './pages/client/team/ClientTeamUpdate'
import ClientSubscription from './pages/client/subscription/ClientSubscription'
import AdminSubscriptionCancellation from './pages/admin/subscription-cancellation/AdminSubscriptionCancellation'
import AdminBillingInformation from './pages/admin/billing-information/AdminBillingInformation'
import AdminSubInvoics from './pages/admin/invoice-management/AdminSubInvoics'
import AdminInvoiceManagementCreate from './pages/admin/invoice-management/AdminInvoiceManagementCreate'
import PrintInvoics from './pages/PrintInvoics'
import AdminPopupMessage from './pages/admin/popup-messages/AdminPopupMessage'
import AdminPopupMessageCreate from './pages/admin/popup-messages/AdminPopupMessageCreate'
import AdminPopupMessageUpdate from './pages/admin/popup-messages/AdminPopupMessageUpdate'
import AdminSupport from './pages/admin/support/AdminSupport'
import AdminFeedback from './pages/admin/feedback/AdminFeedback'
import AdminMenu from './pages/admin/menu/AdminMenu'
import AdminMenuCreate from './pages/admin/menu/AdminMenuCreate'
import AdminMenuUpdate from './pages/admin/menu/AdminMenuUpdate'
import AdminSetting from './pages/admin/AdminSetting'
import './App.css'
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import ClientSubscriptionCancellation from './pages/client/subscription-cancellation/ClientSubscriptionCancellation'
import ClientBillingInformation from './pages/client/billing-information/ClientBillingInformation'
import ClientInvoics from './pages/client/invoice-management/ClientInvoics'
import ClientSupport from './pages/client/support/ClientSupport'
import ClientFeedback from './pages/client/feedback/ClientFeedback'
import AdminLeads from './pages/admin/leads/AdminLeads'
import AdminSupportChat from './pages/admin/support/AdminSupportChat'
import ClientSupportChat from './pages/client/support/ClientSupportChat'
import AdminMail from './pages/admin/mail/AdminMail'
const App = () => {

    // eslint-disable-next-line 
    useEffect(() => {
        Store.dispatch(AuthUserAction());
    }, []);



    return (
        <React.Fragment>

            <Routes>
                {/* Authentication Routes */}
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/verify' element={<Verify />} />
                <Route path='/forgot/password' element={<ForgotPassword />} />
                <Route path='/reset/password/:reset_token' element={<ResetPassword />} />
                <Route path='/set/password/:reset_token' element={<SetPassword />} />



                {/* Admin Routes */}
                <Route path='/admin/*' element={<AdminLayout />}>
                    <Route element={<Admin />}>
                        <Route path='profile' element={<AdminProfile />} />
                        <Route path='setting' element={<AdminSetting />} />
                        <Route path='password' element={<AdminPassword />} />

                        <Route path='dashboard' element={<AdminDashboard />} />

                        {/* Admin */}
                        <Route path='admin' element={<AdminAdmins />} />
                        <Route path='admin/create' element={<AdminAdminCreate />} />
                        <Route path='edit/admin/:id' element={<AdminAdminUpdate />} />


                        {/* Client */}
                        <Route path='client' element={<AdminClient />} />
                        <Route path='client/create' element={<AdminClientCreate />} />
                        <Route path='client/edit/:id' element={<AdminClientUpdate />} />

                        {/* Subscription */}
                        <Route path='subscription' element={<AdminSubscription />} />

                        {/* Subscription Cancellation */}
                        <Route path='subscription/cancellation' element={<AdminSubscriptionCancellation />} />

                        {/* Billing Information */}
                        <Route path='billing/information' element={<AdminBillingInformation />} />

                        {/* Invoice Management */}
                        <Route path='invoice/management' element={<AdminSubInvoics />} />
                        <Route path='invoice/management/create' element={<AdminInvoiceManagementCreate />} />

                        {/* Popup Messages */}
                        <Route path='popup/messages' element={<AdminPopupMessage />} />
                        <Route path='popup/message/create' element={<AdminPopupMessageCreate />} />
                        <Route path='popup/message/update/:id' element={<AdminPopupMessageUpdate />} />

                        {/* Popup Messages */}
                        <Route path='support/ticket' element={<AdminSupport />} />
                        <Route path='support/chat/:id' element={<AdminSupportChat />} />

                        {/* Feedback */}
                        <Route path='feedback' element={<AdminFeedback />} />
                       
                        {/* Leads */}
                        <Route path='leads' element={<AdminLeads />} />

                        {/* Custom Menu */}
                        <Route path='custom/menu' element={<AdminMenu />} />
                        <Route path='custom/menu/create' element={<AdminMenuCreate />} />
                        <Route path='custom/menu/update/:id' element={<AdminMenuUpdate />} />

                        {/* Mails */}
                        <Route path='mail' element={<AdminMail />} />




                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Route>

                <Route path='invoice/management/print/:id' element={<PrintInvoics />} />
                {/* Client Routes */}
                <Route path='/client/*' element={<ClientLayout />}>
                    <Route element={<Client />}>
                        <Route path='profile' element={<ClientProfile />} />
                        <Route path='password' element={<ClientPassword />} />

                        <Route path='dashboard' element={<ClientDashboard />} />

                        {/* Team */}
                        <Route path='team' element={<ClientTeam />} />
                        <Route path='team/create' element={<ClientTeamCreate />} />
                        <Route path='team/edit/:id' element={<ClientTeamUpdate />} />

                        {/* Subscription */}
                        <Route path='subscription' element={<ClientSubscription />} />

                        {/* Subscription Cancellation */}
                        <Route path='subscription/cancellation' element={<ClientSubscriptionCancellation />} />

                        {/* Billing Information */}
                        <Route path='billing/information' element={<ClientBillingInformation />} />

                        {/* Invoice Management */}
                        <Route path='invoice/management' element={<ClientInvoics />} />

                        {/* Popup Messages */}
                        <Route path='support/ticket' element={<ClientSupport />} />
                        <Route path='support/chat/:id' element={<ClientSupportChat />} />

                        {/* Feedback */}
                        <Route path='feedback' element={<ClientFeedback />} />

                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Route>


                {/* 404 */}
                <Route path='*' element={<PageNotFound />} />
            </Routes>

        </React.Fragment>

    )
}

export default App
