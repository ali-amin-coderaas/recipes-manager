import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountPageHeader from "../components/AccountPageHeader";
import useApi from "../hooks/useApi";

const ShopPage = () => {
	const { isLoading, getShopItemById } = useApi("shops");
	const [shop, setShop] = useState({});
	const navigate = useNavigate();

	const { accountId } = useParams();
	const { shopId } = useParams();

	useEffect(() => {
		const fetchShop = async () => {
			try {
				const shop = await getShopItemById(accountId, shopId);
				if (!shop) {
					navigate("/accounts/:accountId");
					throw new Error("Shop not found");
				}
				setShop(shop.data.items);
			} catch (error) {
				throw error;
			}
		};
		fetchShop();
	}, [shopId]);
	return <AccountPageHeader account={shop} loading={isLoading} />;
};

export default ShopPage;
