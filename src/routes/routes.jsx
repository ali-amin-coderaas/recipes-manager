import App from "../App";
import Root from "../components/layout/Root";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ErrorPage from "../ErrorPage";
import DashboardView from "../views/DashboardView";
import ProfileView from "../views/ProfileView";
import RecipesView from "../views/recipesView";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const routes = [
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<RecipesView />
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
				path: "/dashboard",
				element: (
					<ProtectedRoute>
						<DashboardView />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/profile",
				element: (
					<ProtectedRoute>
						<ProfileView />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "*",
				element: <h1>Page Not Found</h1>,
				errorElement: <ErrorPage />,
			},
		],
	},
];

export default routes;
