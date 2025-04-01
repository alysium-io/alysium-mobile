import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
	ChooseAccountProvider,
	CreateArtistProvider,
	ReportedContentProvider
} from '@popups';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { appDeepLinkingConfig } from '../config/linking';

interface AppDependenciesProps {
	children: React.ReactNode;
}

const AppDependencies: React.FC<AppDependenciesProps> = ({ children }) => {
	return (
		<NavigationContainer linking={appDeepLinkingConfig}>
			<BottomSheetModalProvider>
				<ReportedContentProvider>
					<CreateArtistProvider>
						<ChooseAccountProvider>{children}</ChooseAccountProvider>
					</CreateArtistProvider>
				</ReportedContentProvider>
			</BottomSheetModalProvider>
		</NavigationContainer>
	);
};

export default AppDependencies;
