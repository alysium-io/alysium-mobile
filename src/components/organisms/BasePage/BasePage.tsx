import React from 'react';
import BasePageContent from './BasePageContent';
import useBasePage from './useBasePage';

interface BasePageProps {
	children?: React.ReactNode;
	FooterComponent?: React.FC;
}

const BasePage: React.FC<BasePageProps> = ({ children, FooterComponent }) => {
	const { footerHeight, setFooterHeight, isFooterActive, setIsFooterActive } =
		useBasePage();

	return (
		<BasePageContent
			footerHeight={footerHeight}
			setFooterHeight={setFooterHeight}
			isFooterActive={isFooterActive}
			setIsFooterActive={setIsFooterActive}
			FooterComponent={FooterComponent}
		>
			{children}
		</BasePageContent>
	);
};

export default BasePage;
