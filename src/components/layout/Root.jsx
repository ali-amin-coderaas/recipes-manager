import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/TitleBar.css";

const Root = () => {
	const { isLoggedIn, logout } = useAuth();
	return (
		<div>
			<header className="title-bar">
				<h1>Recipes Manager</h1>
				<nav>
					<ul>
						{isLoggedIn ? (
							<>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/profile">Profile</Link>
								</li>
								<li>
									<Link to="/dashboard">Dashboard</Link>
								</li>
								<li>
									<a href="#" onClick={logout} style={{ color: "red" }}>
										Logout
									</a>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/login">Login</Link>
								</li>
								<li>
									<Link to="/register">Register</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
