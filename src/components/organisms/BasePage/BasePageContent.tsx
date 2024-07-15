import { StatusBar, View } from '@atomic';
import React from 'react';
import Footer from './Footer';
import NavbarSeparator from './NavbarSeparator';

interface BasePageContentProps {
	children?: React.ReactNode;
	FooterComponent?: React.FC;
	footerHeight: number;
	setFooterHeight: (footerHeight: number) => void;
	isFooterActive: boolean;
	setIsFooterActive: (isFooterActive: boolean) => void;
}

const BasePageContent: React.FC<BasePageContentProps> = ({
	children,
	FooterComponent,
	footerHeight,
	setFooterHeight,
	isFooterActive,
	setIsFooterActive
}) => {
	return (
		<View
			animated
			backgroundColor='bg.p'
			style={{
				flex: 1,
				paddingBottom: footerHeight
			}}
		>
			{FooterComponent && (
				<Footer
					setIsFooterActive={setIsFooterActive}
					containerProps={{
						onLayout: (e) => setFooterHeight(e.nativeEvent.layout.height)
					}}
				>
					<FooterComponent />
				</Footer>
			)}
			<StatusBar />
			{children}
			<NavbarSeparator isFooterActive={isFooterActive} />
		</View>
	);
};

export default BasePageContent;
