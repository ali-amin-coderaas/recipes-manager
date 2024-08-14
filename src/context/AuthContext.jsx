// src/context/AuthContext.js
import React, { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
	isLoggedIn: false,
	token: null,
};

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
				token: action.payload.token,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
				token: null,
			};
		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = (token) => {
		localStorage.setItem("jwtToken", token);
		dispatch({ type: "LOGIN", payload: { token } });
	};

	const logout = () => {
		localStorage.removeItem("jwtToken");
		dispatch({ type: "LOGOUT" });
	};
	console.log("Authentication state:", state);

	return (
		<AuthContext.Provider value={{ state, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
