import { StatusBar, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import Footer from './Footer';
import NavbarSeparator from './NavbarSeparator';
import useBasePage from './useBasePage';

interface BasePageContentProps {
	children?: React.ReactNode;
	FooterComponent?: React.FC;
}

const BasePageContent: React.FC<BasePageContentProps> = ({
	children,
	FooterComponent
}) => {
	const { theme } = useTheme();
	const { footerHeight, setFooterHeight } = useBasePage();

	return (
		<View
			animated
			style={{
				flex: 1,
				backgroundColor: theme.colors.bg1,
				paddingBottom: footerHeight
			}}
		>
			{FooterComponent && (
				<Footer
					containerProps={{
						onLayout: (e) => setFooterHeight(e.nativeEvent.layout.height)
					}}
				>
					<FooterComponent />
				</Footer>
			)}
			<StatusBar />
			{children}
			<NavbarSeparator />
		</View>
	);
};

export default BasePageContent;
