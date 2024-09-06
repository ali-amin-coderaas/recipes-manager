import AccountPage from "..//pages/AccountPage";
import Root from "../components/layout/Root";
import ErrorPage from "../ErrorPage";
import ShopPage from "../pages/ShopPage";
import AccountsView from "../views/AccountsView";
import DashboardView from "../views/DashboardView";
import LoginView from "../views/LoginView";
import RecipesView from "../views/RecipesView";
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
						<DashboardView />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/recipes",
				element: (
					<ProtectedRoute>
						<RecipesView />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/accounts",
				element: (
					<ProtectedRoute>
						<AccountsView />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "/accounts/:accountId",
				element: (
					<ProtectedRoute>
						<AccountPage />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},

			{
				path: "/accounts/:accountId/shops/:shopId",
				element: (
					<ProtectedRoute>
						<ShopPage />
					</ProtectedRoute>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "*",
				element: <h1>Page Not Found</h1>,
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
		],
	},
];

export default routes;
