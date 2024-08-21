import React, { useEffect, useState } from "react";
import { createAccount, getAllAccounts } from "../api/mallAccountsAPI";

function useMallAccounts() {
	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const addAccount = async (name) => {
		const newAccount = { name: name };
		try {
			await createAccount(newAccount);
			await fetchData();
		} catch (error) {
			setError(error);
		}
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await getAllAccounts();
			setAccounts(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { accounts, loading, error, addAccount };
}

export default useMallAccounts;
