import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";
import { validateEmail } from "../utils/ValidateEmail";
import InputField from "./InputField";

const LoginForm = () => {
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");

	const IsFormValid = () => {
		return validateEmail(Email) && Password.length >= 8;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("logged in successfully");
		clearForm();
	};

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<fieldset>
					<h2>Login</h2>
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

					<button type="submit" disabled={!IsFormValid()}>
						Login
					</button>
					<p>
						Don't have an account?{" "}
						<Link to={"/register"}>
							<a>Register</a>
						</Link>
					</p>
				</fieldset>
			</form>
		</div>
	);
};

export default LoginForm;
