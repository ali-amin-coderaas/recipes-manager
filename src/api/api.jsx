import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: "https://recipes-expressjs-i6wd.onrender.com",
	// baseURL: "http://localhost:8080",

	headers: {
		"Content-Type": "application/json",
	},
});

export const setupInterceptors = (logout) => {
	api.interceptors.request.use(
		(config) => {
			const token = Cookies.get("jwtToken");
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
				Cookies.remove("jwtToken");
				logout();
			}
			return Promise.reject(error);
		}
	);
};

export default api;
