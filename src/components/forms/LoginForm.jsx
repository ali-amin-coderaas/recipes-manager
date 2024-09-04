import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail } from "../../utils/ValidateEmail";
import InputField from "./InputField";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const IsFormValid = () => {
		return validateEmail(email) && password.length >= 8;
	};

	const clearForm = () => {
		setPassword("");
		setEmail("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const data = await loginUser(email, password);

			if (data.token) {
				login(data.token);
				navigate("/");
				clearForm();
				setLoading(false);
			} else {
				console.error("Token not received in response:", data);
			}
		} catch (error) {
			console.error(error);
		}

		clearForm();
	};

	return (
		<div className="flex flex-column gap-3 align-items-end">
			<InputField
				label={"Email"}
				id="email"
				type="email"
				value={email}
				autoComplete="email"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<InputField
				label={"Password"}
				id="password"
				type="password"
				value={password}
				autoComplete="current-password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				label="Login"
				icon="pi pi-user"
				disabled={!IsFormValid()}
				onClick={handleSubmit}
				loading={loading}
			/>
		</div>
	);
}
