import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import { validateEmail } from "../utils/ValidateEmail";

const RegisterForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
	};

	const IsFormValid = () => {
		return firstName && validateEmail(email) && password.length >= 8;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (IsFormValid()) {
			try {
				const response = await registerUser(
					firstName,
					lastName,
					email,
					password
				);
				console.log(response);

				clearForm();
			} catch (error) {
				console.error(error);
			}
		}
		clearForm();
	};
	return <div className="register"></div>;
};

export default RegisterForm;
