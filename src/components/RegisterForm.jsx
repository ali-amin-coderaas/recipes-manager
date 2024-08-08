import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/register.css";
import { validateEmail } from "../utils/ValidateEmail";
import InputField from "./InputField";

const RegisterForm = () => {
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
	};

	const PasswordErrorMessage = () => {
		return (
			<p className="field-error">Password should have at least 8 characters</p>
		);
	};

	const registerUser = async (first_name, last_name, email, password) => {
		try {
			const response = await fetch("http://localhost:8080/register", {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify({ first_name, last_name, email, password }),
			});
			const id = await response.json();

			console.log(id);
		} catch (error) {
			console.error(error);
		}
	};

	const IsFormValid = () => {
		return FirstName && validateEmail(Email) && Password.length >= 8;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (IsFormValid()) {
			registerUser(FirstName, LastName, Email, Password);
		}
		clearForm();
	};
	return (
		<div className="register">
			<form onSubmit={handleSubmit}>
				<fieldset>
					<h2>Register An Account</h2>
					<InputField
						type={"text"}
						value={FirstName}
						placeholder={"First name"}
						label={"First name"}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>
					<InputField
						type={"text"}
						value={LastName}
						placeholder={"Last name"}
						label={"Last name"}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
					<InputField
						type={"email"}
						value={Email}
						placeholder={"Email"}
						label={"Email"}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<InputField
						type={"password"}
						value={Password}
						placeholder={"Password"}
						label={"Password"}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					{/* {Password.length < 8 ? <PasswordErrorMessage /> : null} */}
					<button type="submit" disabled={!IsFormValid()}>
						Create account
					</button>
					<p>
						Already have an account?{" "}
						<Link to={"/login"}>
							<a>Log In</a>
						</Link>
					</p>
				</fieldset>
			</form>
		</div>
	);
};

export default RegisterForm;
