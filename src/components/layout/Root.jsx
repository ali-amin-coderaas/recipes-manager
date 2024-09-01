import { Menubar } from "primereact/menubar";
import { Outlet, useNavigate } from "react-router-dom";
import { setupInterceptors } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

const Root = () => {
	const { isLoggedIn, logout } = useAuth();
	const navigate = useNavigate();
	const start = <h1>Mall Insights</h1>;
	setupInterceptors(logout);

	const menuItems = isLoggedIn
		? [
				{
					label: "Dashboard",
					command: () => {
						navigate("/");
					},
				},
				{
					label: "Accounts",
					command: () => {
						navigate("/accounts");
					},
				},
				{
					label: "Recipes",
					command: () => {
						navigate("/recipes");
					},
				},
				{
					label: "Logout",
					command: logout,
					icon: "pi pi-sign-out",
				},
		  ]
		: [
				{
					label: "Login",
					command: () => {
						navigate("/login");
					},
				},
				{
					label: "Register",
					command: () => {
						navigate("/register");
					},
				},
		  ];

	return (
		<div className="m-0">
			<header>
				<Menubar
					className="bg-primary justify-content-between border-none border-noround px-8"
					model={menuItems}
					start={start}
				/>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
