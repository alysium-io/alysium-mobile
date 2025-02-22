import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ReportedContentProvider } from '@popups';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { artistAppDeepLinkingConfig } from '../config/linking';

interface AppDependenciesProps {
	children: React.ReactNode;
}

const AppDependencies: React.FC<AppDependenciesProps> = ({ children }) => {
	return (
		<NavigationContainer linking={artistAppDeepLinkingConfig}>
			<BottomSheetModalProvider>
				<ReportedContentProvider>{children}</ReportedContentProvider>
			</BottomSheetModalProvider>
		</NavigationContainer>
	);
};

export default AppDependencies;
