import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import RedirectLoading from './RedirectLoading';

const Admin = () => {
    const { user } = useSelector((state) => state.auth);
    return user && user.role === "Admin" ? <Outlet /> : <RedirectLoading />
}

export default Admin
