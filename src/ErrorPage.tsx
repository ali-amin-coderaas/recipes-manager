import { useRouteError } from "react-router-dom";

const style = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
};

const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);
	return (
		<div id="error-page" style={style}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
};

export default ErrorPage;
