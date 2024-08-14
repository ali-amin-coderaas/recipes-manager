import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import routes from "./routes/routes.jsx";

const router = createBrowserRouter(routes);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} future={{ v7_startTransition: true }} />
		</AuthProvider>
	);
}

export default App;
