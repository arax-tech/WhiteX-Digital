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



                {/* Admin Routes */}
                <Route path='/admin/*' element={<AdminLayout />}>
                    <Route element={<Admin />}>
                        <Route path='profile' element={<AdminProfile />} />
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


                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Route>
                
                
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
