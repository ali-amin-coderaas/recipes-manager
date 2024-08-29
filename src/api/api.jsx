import axios from "axios";

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
			const token = localStorage.getItem("jwtToken");
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
				logout();
			}
			return Promise.reject(error);
		}
	);
};

export default api;
