import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-purple/theme.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import routes from "./routes/routes.jsx";
import "./styles/reset.css";

const router = createBrowserRouter(routes);

function App() {
	return (
		<PrimeReactProvider>
			<AuthProvider>
				<RouterProvider router={router} future={{ v7_startTransition: true }} />
			</AuthProvider>
		</PrimeReactProvider>
	);
}

export default App;
