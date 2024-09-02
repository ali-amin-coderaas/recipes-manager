import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiService from "./../api/ApiService";

function useApi(endpoint) {
	const [data, setData] = useState([
		{
			data: {
				items: [],
			},
		},
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();

	const apiService = new ApiService(endpoint);

	const currentPage = parseInt(searchParams.get("page"), 10) || 1;
	const pageSize = parseInt(searchParams.get("pageSize"), 10) || 5;
	const searchQuery = searchParams.get("q") || "";

	const updateURLParams = (field, value) => {
		setSearchParams((curr) => {
			curr.set(field, value);
			return curr;
		});
	};

	const fetchData = async (page = currentPage, pageSize, searchQuery) => {
		setIsLoading(true);
		try {
			const data = await apiService.getAll(page, pageSize, searchQuery);
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
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
			await fetchData(currentPage, pageSize);
		}
	};

	const createItem = async (data) => {
		setIsLoading(true);
		try {
			await apiService.create(data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
			await fetchData(currentPage, pageSize);
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
		fetchData(currentPage, pageSize, searchQuery);
	}, [currentPage, pageSize, searchQuery]);

	return {
		data,
		isLoading,
		error,
		createItem,
		updateItem,
		getItemById,
		deleteItem,
		searchQuery,
		currentPage,
		totalItems,
		pageSize,
		setCurrentPage: (page) => updateURLParams("page", page),
		setPageSize: (pageSize) => updateURLParams("pageSize", pageSize),
		setSearchQuery: (searchQuery) => updateURLParams("q", searchQuery),
	};
}

export default useApi;
