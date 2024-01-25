import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'
import { AuthUserAction } from './redux/actions/AuthAction'
import Store from './redux/Store'

const App = () => {
    // eslint-disable-next-line 
    useEffect(() => {
        Store.dispatch(AuthUserAction());
    }, []);
    return (
        
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<Login />} />


                <Route path='*' element={<NotFound />} />
            </Routes>
    
    )
}

export default App
