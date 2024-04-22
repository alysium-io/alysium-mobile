import React from 'react';
import BasePageContent from './BasePageContent';
import { BasePageProvider } from './context';

interface BasePageProps {
	children?: React.ReactNode;
	FooterComponent?: React.FC;
}

const BasePage: React.FC<BasePageProps> = ({ children, FooterComponent }) => {
	return (
		<BasePageProvider>
			<BasePageContent FooterComponent={FooterComponent}>
				{children}
			</BasePageContent>
		</BasePageProvider>
	);
};

export default BasePage;
