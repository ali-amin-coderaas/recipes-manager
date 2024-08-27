import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	createAccount,
	getAllAccounts,
	getById,
	softDeleteAccount,
} from "../api/mallAccountsAPI";

function useMallAccounts() {
	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const [searchParams, setSearchParams] = useSearchParams();

	const updateURLParams = (page, pageSize) => {
		setSearchParams({ page, pageSize });
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

	const fetchData = async (page = currentPage, pageSize = 5) => {
		setLoading(true);

		try {
			const data = await getAllAccounts(page, pageSize);

			setAccounts(data.data || []);
			setCurrentPage(data.pagination.currentPage || currentPage);
			setTotalItems(data.pagination.totalItems || totalItems);
			setPageSize(data.pagination.pageSize || pageSize);
			updateURLParams(data.pagination.currentPage, data.pagination.pageSize);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(currentPage, pageSize);
	}, [currentPage, pageSize]);

	return {
		accounts,
		loading,
		error,
		addAccount,
		getAccountById,
		deleteAccountById,
		currentPage,
		totalItems,
		pageSize,
		setCurrentPage,
	};
}

export default useMallAccounts;
