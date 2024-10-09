import { BasePage } from '@organisms';
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import ProfilePageHeader from './UserProfile.header';
import CreateProfileActionFooter from './components/CreateProfileActionFooter';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import useUserProfilePage from './useUserProfilePage';

const ProfilePage = () => {
	const { createArtistSheetApi } = useUserProfilePage();

	// Create Host & Artist footer
	const FooterComponent = useCallback(
		() => (
			<CreateProfileActionFooter createArtistSheetApi={createArtistSheetApi} />
		),
		[]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<ProfilePageHeader />
			<ScrollView alwaysBounceVertical>
				<HeaderSection />
				<SelectAccountSection />
				<MenuSection />
				<LogoutSection />
			</ScrollView>
		</BasePage>
	);
};

export default ProfilePage;
