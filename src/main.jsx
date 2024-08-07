import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import ErrorPage from "./ErrorPage.jsx";
import "./styles/index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/register",
		element: <RegisterForm />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <LoginForm />,
		errorElement: <ErrorPage />,
	},
	{
		path: "*",
		element: <h1>Page Not Found</h1>,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
