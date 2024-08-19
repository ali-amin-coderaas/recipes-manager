import React, { useEffect, useState } from "react";
import { fetchMallAccounts } from "../api/mallAccountsAPI";

function useMallAccounts() {
	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const data = await fetchMallAccounts();
				setAccounts(data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return { accounts, loading, error };
}

export default useMallAccounts;
