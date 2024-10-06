import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes";
import { Navigate, useLocation } from "react-router-dom";
import Loader from '../components/Loader';


const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    const location = useLocation;

    if(loading) return <Loader></Loader>;

    if(user) return children;

    return <Navigate state={location.pathname} to={ROUTES.LOGIN}></Navigate>
}

export default PrivateRoute;