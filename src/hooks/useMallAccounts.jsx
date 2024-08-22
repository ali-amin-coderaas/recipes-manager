import React, { useEffect, useState } from "react";
import {
	createAccount,
	deleteAccount,
	getAllAccounts,
	getById,
} from "../api/mallAccountsAPI";

function useMallAccounts() {
	const [account, setAccount] = useState({});
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
		} finally {
			setLoading(false);
		}
	};

	const getAccountById = async (id) => {
		setLoading(true);
		try {
			const response = await getById(id);
			return response;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const deleteAccountById = async (id) => {
		try {
			await deleteAccount(id);
			// await fetchData();
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

	return {
		accounts,
		loading,
		error,
		addAccount,
		getAccountById,
		deleteAccountById,
	};
}

export default useMallAccounts;
