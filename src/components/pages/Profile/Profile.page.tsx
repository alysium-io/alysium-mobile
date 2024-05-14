import { HeaderSafeArea, ScrollView } from '@atomic';
import { withProvider } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import { ProfilePageProvider } from './Profile.context';
import {
	CreateProfileActionFooter,
	HeaderSection,
	LogoutSection,
	MenuSection,
	SelectAccountSection
} from './components';

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

export default withProvider(ProfilePage, ProfilePageProvider);
