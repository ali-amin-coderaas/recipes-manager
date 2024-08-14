import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
	const { state } = useAuth();
	const isLoggedIn = state;

	return !isLoggedIn ? children : <Navigate to="/" />;
};

PublicRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicRoute;
