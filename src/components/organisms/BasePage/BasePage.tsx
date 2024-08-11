import { StatusBar, View } from '@atomic';
import { useLayoutDimensions } from '@hooks';
import React from 'react';
import Footer from './Footer';
import NavbarSeparator from './NavbarSeparator';
import useBasePage from './useBasePage';

interface BasePageProps {
	children?: React.ReactNode;
	FooterComponent?: React.FC;
}

const BasePage: React.FC<BasePageProps> = ({ children, FooterComponent }) => {
	const { isFooterActive, setIsFooterActive } = useBasePage();

	const { onLayout: onFooterLayout, dimensions: footerDimensions } =
		useLayoutDimensions();

	return (
		<View
			animated
			backgroundColor='bg.p'
			style={{
				flex: 1,
				marginBottom: footerDimensions.height
			}}
		>
			{FooterComponent && (
				<Footer setIsFooterActive={setIsFooterActive} onLayout={onFooterLayout}>
					<FooterComponent />
				</Footer>
			)}
			<StatusBar />
			{children}
			<NavbarSeparator isFooterActive={isFooterActive} />
		</View>
	);
};

export default BasePage;
