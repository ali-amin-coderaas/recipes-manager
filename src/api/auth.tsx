import api from "./api";

/**
 * Logs in a user with the given email and password.
 *
 * @async
 * @function loginUser
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @throws {Error} If there is an error during the login process.
 * @returns {Promise<object>} The user's information.
 */
export const loginUser = async (
	email: string,
	password: string
): Promise<object> => {
	try {
		const response = await api.post(
			"/login",
			JSON.stringify({ email, password })
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};
/**
 * Registers a new user with the given first name, last name, email, and password.
 *
 * @async
 * @function registerUser
 * @param {string} first_name - The user's first name.
 * @param {string} last_name - The user's last name.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @throws {Error} If there is an error during the registration process.
 * @returns {Promise<object>} The registered user's information.
 */
export const registerUser = async (
	first_name: string,
	last_name: string,
	email: string,
	password: string
): Promise<object> => {
	try {
		const response = await api.post("/register", {
			first_name,
			last_name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
