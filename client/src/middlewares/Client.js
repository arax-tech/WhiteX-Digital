import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import RedirectLoading from './RedirectLoading';

const Client = () => {
    const { user } = useSelector((state) => state.auth);
    return user && user.role === "Client" ? <Outlet /> : <RedirectLoading />
}

export default Client
