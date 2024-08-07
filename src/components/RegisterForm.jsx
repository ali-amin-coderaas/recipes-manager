import React, { useState } from "react";
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

	const IsFormValid = () => {
		return FirstName && validateEmail(Email) && Password.length >= 8;
	};

	const hadnleSubmit = (e) => {
		e.preventDefault();
		alert("account created successfully");
		clearForm();
	};
	return (
		<div className="register">
			<form onSubmit={hadnleSubmit}>
				<fieldset>
					<h2>Register An Account</h2>
					<InputField
						type={"text"}
						value={LastName}
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
						Already have an account{" "}
						<span>
							<a href="#">Log In</a>
						</span>
					</p>
				</fieldset>
			</form>
		</div>
	);
};

export default RegisterForm;
