import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import "../styles/register.css";
import { validateEmail } from "../utils/ValidateEmail";
import InputField from "./InputField";

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
	return (
		<div className="register">
			<form onSubmit={handleSubmit}>
				<fieldset>
					<h2>Register An Account</h2>
					<InputField
						type={"text"}
						value={firstName}
						placeholder={"First name"}
						label={"First name"}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>
					<InputField
						type={"text"}
						value={lastName}
						placeholder={"Last name"}
						label={"Last name"}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
					<InputField
						type={"email"}
						value={email}
						placeholder={"Email"}
						label={"Email"}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<InputField
						type={"password"}
						value={password}
						placeholder={"Password"}
						label={"Password"}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
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
