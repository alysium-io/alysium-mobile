import { useState } from 'react';

interface BasePageApi {
	isFooterActive: boolean;
	setIsFooterActive: (value: boolean) => void;
	footerHeight: number;
	setFooterHeight: (value: number) => void;
}

const useBasePage = (): BasePageApi => {
	const [isFooterActive, setIsFooterActive] = useState(false);
	const [footerHeight, setFooterHeight] = useState(0);

	return {
		isFooterActive,
		setIsFooterActive,
		footerHeight,
		setFooterHeight
	};
};

export default useBasePage;
