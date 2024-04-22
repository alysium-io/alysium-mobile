import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import {
	CreateProfileActionFooter,
	HeaderSection,
	LogoutSection,
	MenuSection,
	SelectAccountSection
} from './components';
import { ProfilePageProvider } from './contexts';

const ProfilePage = () => {
	return (
		<BasePage FooterComponent={CreateProfileActionFooter}>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<HeaderSection />
					<SelectAccountSection />
					<MenuSection />
					<LogoutSection />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default () => (
	<ProfilePageProvider>
		<ProfilePage />
	</ProfilePageProvider>
);
