import { Menubar } from "primereact/menubar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/TitleBar.css";

const Root = () => {
	const { isLoggedIn, logout } = useAuth();
	const navigate = useNavigate();
	const start = <h1>Recipes Manager</h1>;
	// const end =

	const menuItems = isLoggedIn
		? [
				{
					label: "Home",
					command: () => {
						navigate("/");
					},
				},
				{
					label: "Profile",
					command: () => {
						navigate("/profile");
					},
				},
				{
					label: "Dashboard",
					command: () => {
						navigate("/dashboard");
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
				<Menubar model={menuItems} start={start} />
			</header>
			<main
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
