// src/routes/routes.js
import App from "../App";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ErrorPage from "../ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const routes = [
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<App />
			</ProtectedRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/register",
		element: (
			<PublicRoute>
				<RegisterForm />
			</PublicRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: (
			<PublicRoute>
				<LoginForm />
			</PublicRoute>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "*",
		element: <h1>Page Not Found</h1>,
		errorElement: <ErrorPage />,
	},
];

export default routes;
