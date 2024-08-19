import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
	baseURL: "https://recipes-expressjs-i6wd.onrender.com",
	headers: {
		"Content-Type": "application/json",
	},
});

// const isTokenExpired = (token) => {
// 	if (!token) return true;
// 	const decodedToken = jwtDecode(token);
// 	const currentTime = Date.now() / 1000;
// 	return decodedToken.exp < currentTime;
// };
export const setupInterceptors = (navigate) => {
	api.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("jwtToken");

			// if (isTokenExpired(token)) {
			// 	localStorage.removeItem("jwtToken");
			// 	navigate("/login");
			// 	return Promise.reject(new Error("Token expired"));
			// }
			if (token) {
				config.headers.authorization = `Bearer ${token}`;
			}

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response?.status === 401 || error.response?.status === 403) {
				localStorage.removeItem("jwtToken");
				navigate("/login");
			}
			return Promise.reject(error);
		}
	);
};

export default api;
