import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
// import "primereact/resources/themes/soho-dark/theme.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import routes from "./routes/routes.jsx";
import "./styles/reset.css";
import "/node_modules/primeflex/primeflex.css";

const router = createBrowserRouter(routes);

function App() {
	return (
		<PrimeReactProvider>
			<ToastProvider>
				<AuthProvider>
					<RouterProvider
						router={router}
						future={{ v7_startTransition: true }}
					/>
				</AuthProvider>
			</ToastProvider>
		</PrimeReactProvider>
	);
}

export default App;
