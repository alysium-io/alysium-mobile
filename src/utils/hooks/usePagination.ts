import { useState } from 'react';

interface IUsePagination {
	page: number;
	defaultPage: number;
	defaultLimit: number;
	nextPage: () => void;
}

const usePagination = (): IUsePagination => {
	const defaultPage = 1;
	const defaultLimit = 25;

	const [page, setPage] = useState(defaultPage);

	const nextPage = () => {
		setPage((prev) => prev + 1);
	};

	return {
		page,
		nextPage,
		defaultPage,
		defaultLimit
	};
};

export default usePagination;
