import { useState } from 'react';

interface BasePageApi {
	isFooterActive: boolean;
	setIsFooterActive: (value: boolean) => void;
}

const useBasePage = (): BasePageApi => {
	const [isFooterActive, setIsFooterActive] = useState(false);

	return {
		isFooterActive,
		setIsFooterActive
	};
};

export default useBasePage;
