import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpiner from "../Components/Shared/LoadingSpiner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  if (loading) {
    return <LoadingSpiner />;
  } else if (!loading && user) {
    return children;
  }
  return <Navigate state={pathname} to="/signin" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
