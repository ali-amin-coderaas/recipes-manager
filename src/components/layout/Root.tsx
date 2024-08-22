import { Menubar } from "primereact/menubar";
import React from "react";
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
					style: { color: "red" },
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
		<div className="root-div">
			<header>
				<Menubar
					model={menuItems}
					start={start}
					style={{ justifyContent: "space-between" }}
				/>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
