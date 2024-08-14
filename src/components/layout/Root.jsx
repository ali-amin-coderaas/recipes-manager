import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/TitleBar.css";

const Root = () => {
	const { state, logout } = useAuth();
	const isLoggedIn = state;
	return (
		<div>
			<header className="title-bar">
				<h1>My App</h1>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						{isLoggedIn ? (
							<>
								<li>
									<Link to="profile">Profile</Link>
								</li>
								<li>
									<Link to="dashboard">Dashboard</Link>
								</li>
								<li>
									<button onClick={logout}>Logout</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="login">Login</Link>
								</li>
								<li>
									<Link to="register">Register</Link>
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
