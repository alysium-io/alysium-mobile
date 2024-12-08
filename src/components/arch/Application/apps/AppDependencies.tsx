import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { artistAppDeepLinkingConfig } from '../tabs/linking';

interface AppDependenciesProps {
	children: React.ReactNode;
}

const AppDependencies: React.FC<AppDependenciesProps> = ({ children }) => {
	return (
		<NavigationContainer linking={artistAppDeepLinkingConfig}>
			<BottomSheetModalProvider>{children}</BottomSheetModalProvider>
		</NavigationContainer>
	);
};

export default AppDependencies;
