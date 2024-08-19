import Root from "../components/layout/Root";
import ErrorPage from "../ErrorPage";
import DashboardView from "../views/DashboardView";
import LoginView from "../views/LoginView";
import ProfileView from "../views/ProfileView";
import RecipesView from "../views/recipesView";
import RegisterView from "../views/RegisterView";
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
						<RegisterView />
					</PublicRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/login",
				element: (
					<PublicRoute>
						<LoginView />
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
