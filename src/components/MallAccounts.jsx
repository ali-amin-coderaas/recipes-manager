import React from "react";
import useMallAccounts from "../hooks/useMallAccounts";

const MallAccounts = () => {
	const { accounts, loading, error } = useMallAccounts();
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading accounts: {error.message}</p>;

	return (
		<div>
			<h2>Accounts List</h2>
			<ul>
				{accounts.map((account) => (
					<li key={account.id}>
						<strong>{account.name}</strong> (Active:{" "}
						{account.isActive ? "Yes" : "No"})
						<br />
						Created At: {new Date(account.createdAt).toLocaleString()}
					</li>
				))}
			</ul>
		</div>
	);
};

export default MallAccounts;
