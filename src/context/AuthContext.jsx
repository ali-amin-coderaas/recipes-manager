// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("jwtToken");

		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const login = (token) => {
		localStorage.setItem("jwtToken", token);
		setIsLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem("jwtToken");
		setIsLoggedIn(false);
	};

	console.log("Authentication state:", isLoggedIn);

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
