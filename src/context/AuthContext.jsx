// src/context/AuthContext.js
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const token = Cookies.get("jwtToken");

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		if (token) {
			return true;
		}
		return false;
	});

	useEffect(() => {
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const login = (token) => {
		Cookies.set("jwtToken", token, { expires: 1 });
		setIsLoggedIn(true);
	};

	const logout = () => {
		Cookies.remove("jwtToken");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
