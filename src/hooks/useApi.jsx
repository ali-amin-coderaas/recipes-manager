import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiService from "./../api/ApiService";

function useApi(endpoint, enableUseEffect = false) {
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
	const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;
	const searchQuery = searchParams.get("q") || "";
	const sortBy = searchParams.get("sortBy") || "createdAt";
	const order = searchParams.get("order") || "desc";

	const updateURLParams = (field, value) => {
		setSearchParams((curr) => {
			curr.set(field, value);
			return curr;
		});
	};

	const fetchData = async (
		page = currentPage,
		pageSize,
		searchQuery,
		sortBy,
		order
	) => {
		setIsLoading(true);
		try {
			const data = await apiService.getAll(
				page,
				pageSize,
				searchQuery,
				sortBy,
				order
			);
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
			const updatedData = await apiService.update(id, data);
			console.log("🚀 ~ updateItem ~ updatedData:", updatedData);
			return updatedData.data.items;
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

	const getShopItemById = async (accountId, shopId) => {
		setIsLoading(true);

		try {
			const response = await apiService.getShopById(accountId, shopId);
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

	if (enableUseEffect) {
		useEffect(() => {
			fetchData(currentPage, pageSize, searchQuery, sortBy, order);
		}, [currentPage, pageSize, searchQuery]);
	}
	return {
		data,
		isLoading,
		error,
		createItem,
		updateItem,
		getItemById,
		deleteItem,
		getShopItemById,
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
