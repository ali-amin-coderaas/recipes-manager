import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { setupInterceptors } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

const Root = () => {
	const { isLoggedIn, logout } = useAuth();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const navigate = useNavigate();
	setupInterceptors(logout);

	const context = useContext(PrimeReactContext);

	if (!context) {
		throw new Error(
			"PrimeReactContext is not available. Ensure it is provided in your app."
		);
	}

	const { changeTheme } = context;

	const lightTheme = "lara-light-blue";
	const darkTheme = "lara-dark-blue";

	const toggleTheme = () => {
		const currentTheme = !isDarkMode ? lightTheme : darkTheme;
		const newTheme = isDarkMode ? lightTheme : darkTheme;
		changeTheme(currentTheme, newTheme, "theme-link", () => {
			setIsDarkMode(!isDarkMode);
		});
	};

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

	const start = <h1 className="pr-4">Mall Insights</h1>;

	const end = (
		<div className="flex gap-4 align-items-center">
			<h1 className="pr-4">Mall Insights</h1>
			<Button
				icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
				onClick={toggleTheme}
				rounded
				color="var(--primary-color)"
				tooltip="Toggle Theme"
				tooltipOptions={{
					showDelay: 500,
					position: "bottom",
					mouseTrack: true,
					mouseTrackTop: 15,
				}}
			></Button>
			{isLoggedIn && (
				<Button onClick={logout} rounded severity="danger">
					Logout
				</Button>
			)}
		</div>
	);

	return (
		<div className="m-0">
			<header>
				<Menubar
					color="primary"
					className="  border-none border-noround px-2"
					model={menuItems}
					// start={start}
					end={end}
				/>
			</header>
			<main className="mx-4 md:mx-8 my-8">
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
