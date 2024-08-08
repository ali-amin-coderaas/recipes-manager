import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "../styles/register.css";
import { validateEmail } from "../utils/ValidateEmail";
import InputField from "./InputField";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const IsFormValid = () => {
		return validateEmail(email) && password.length >= 8;
	};

	const clearForm = () => {
		setPassword("");
		setEmail("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await loginUser(email, password);
			if (data.token) {
				localStorage.setItem("jwtToken", data.token);
				clearForm();
				navigate("/");
			} else {
				console.error("Token not received in response:", data);
			}
		} catch (error) {
			console.error(error);
		}

		clearForm();
	};

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<fieldset>
					<h2>Login</h2>
					<InputField
						type={"email"}
						value={email}
						placeholder={"Email"}
						label={"Email"}
						autoComplete={"email"}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<InputField
						type={"password"}
						value={password}
						placeholder={"Password"}
						label={"Password"}
						autoComplete={"current-password"}
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
