import axios from "axios";

const api = axios.create({
	baseURL: "https://recipes-expressjs-i6wd.onrender.com",
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Sets up request and response interceptors for the api instance.
 * The request interceptor adds an authorization header with a Bearer token
 * if a token is found in local storage.
 * The response interceptor logs out the user if a 401 or 403 status is
 * returned, and then rejects the error.
 * @param {() => void} logout - a function to log the user out
 * @returns {void}
 */
export const setupInterceptors = (logout: () => void): void => {
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
