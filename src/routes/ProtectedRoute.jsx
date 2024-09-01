import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
