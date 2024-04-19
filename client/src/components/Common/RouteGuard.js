import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export const RouteGuard = ({
    children
}) => {
    const { isAuthenticted } = useAuthContext();

    if (!isAuthenticted) {
        return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />;
};