import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
	const token = localStorage.getItem("jwtToken");

	return !token ? children : <Navigate to="/" />;
};

PublicRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicRoute;
