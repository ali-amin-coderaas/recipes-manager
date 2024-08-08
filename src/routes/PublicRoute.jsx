
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
	const token = localStorage.getItem("jwtToken");

	return !token ? children : <Navigate to="/" />;
};

export default PublicRoute;
