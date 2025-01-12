import { ScrollView } from '@atomic';
import { useSheet } from '@hooks';
import { BasePage } from '@organisms';
import React, { useCallback } from 'react';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import ProfilePageHeader from './UserProfile.header';
import CreateProfileActionFooter from './components/CreateProfileActionFooter';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';

const ProfilePage = () => {
	const createArtistSheetApi = useSheet();

	const FooterComponent = useCallback(
		() => (
			<CreateProfileActionFooter createArtistSheetApi={createArtistSheetApi} />
		),
		[]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<ProfilePageHeader />
			<ScrollView>
				<HeaderSection />
				<SelectAccountSection />
				<MenuSection />
				<LogoutSection />
			</ScrollView>
		</BasePage>
	);
};

export default ProfilePage;
