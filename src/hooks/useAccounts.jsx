import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	createAccount,
	getAll,
	getById,
	softDeleteAccount,
} from "../api/crudAPI";

function useAccounts(endpoint) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = parseInt(searchParams.get("page"), 10) || 1;
	const pageSize = parseInt(searchParams.get("pageSize"), 10) || 5;

	const updateURLParams = (page, pageSize) => {
		setSearchParams((curr) => {
			curr.set("page", page);
			curr.set("pageSize", pageSize);
			return curr;
		});
	};

	const addAccount = async (name) => {
		const newAccount = { name: name };
		try {
			await createAccount(newAccount);
			await fetchData(currentPage);
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
			await softDeleteAccount(id);
		} catch (error) {
			setError(error);
		}
	};

	const fetchData = async (page = currentPage, pageSize) => {
		setLoading(true);

		try {
			const data = await getAll(endpoint, page, pageSize);
			setData(data.data || []);
			setTotalItems(data.pagination.totalItems || totalItems);
			updateURLParams(data.pagination.currentPage, data.pagination.pageSize);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(currentPage, pageSize);
	}, []);

	return {
		data,
		loading,
		error,
		addAccount,
		getAccountById,
		deleteAccountById,
		currentPage,
		totalItems,
		pageSize,
		setCurrentPage: (page) => updateURLParams(page, pageSize),
	};
}

export default useAccounts;
