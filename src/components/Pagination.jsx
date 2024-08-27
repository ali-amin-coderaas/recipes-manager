import { Paginator } from "primereact/paginator";
import { useState } from "react";

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
	const [first, setFirst] = useState((currentPage - 1) * pageSize);

	return (
		<div className="">
			<Paginator
				first={first}
				rows={pageSize}
				totalRecords={totalItems}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default Pagination;
