import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiService from "./../api/ApiService";

function useApi(endpoint) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();

	const apiService = new ApiService(endpoint);

	const currentPage = parseInt(searchParams.get("page"), 10) || 1;
	const pageSize = parseInt(searchParams.get("pageSize"), 10) || 5;

	const updateURLParams = (field, value) => {
		setSearchParams((curr) => {
			curr.set(field, value);
			return curr;
		});
	};

	const fetchData = async (page = currentPage, pageSize) => {
		setIsLoading(true);
		try {
			const data = await apiService.getAll(page, pageSize);
			setData(data.data);
			setTotalItems(data.pagination.totalItems || totalItems);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateItem = async (id, data) => {
		setIsLoading(true);
		try {
			await apiService.update(id, data);
			await fetchData(currentPage, pageSize);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const createItem = async (data) => {
		setIsLoading(true);
		try {
			await apiService.create(data);
			await fetchData(currentPage, pageSize);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getItemById = async (id) => {
		setIsLoading(true);
		try {
			const response = await apiService.getById(id);
			return response.data;
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteItem = async (id) => {
		setIsLoading(true);

		try {
			await apiService.softDelete(id);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(currentPage, pageSize);
	}, [currentPage, pageSize]);

	return {
		data,
		isLoading,
		error,
		createItem,
		updateItem,
		getItemById,
		deleteItem,
		currentPage,
		totalItems,
		pageSize,
		setCurrentPage: (page) => updateURLParams("page", page),
		setPageSize: (pageSize) => updateURLParams("pageSize", pageSize),
	};
}

export default useApi;
