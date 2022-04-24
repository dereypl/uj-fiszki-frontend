import {Navigate, Outlet} from 'react-router-dom';
import {ROUTES} from "./index.js";
import {useAuth} from "../context/AuthContext";

const PrivateRoute = ({redirectPath = ROUTES.PUBLIC.LOGIN}) => {
    const {currentUser} = useAuth()

    if (!currentUser) {
        return <Navigate to={redirectPath} replace/>;
    }

    return <Outlet/>;
};

export default PrivateRoute