import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { RefreshControl, ScrollView } from '@atomic';
import { useRefresh, useSheet } from '@hooks';
import { BasePage } from '@organisms';
import React, { useCallback } from 'react';
import MenuSection from '../../components/MenuSection';
import ProfilePageHeader from '../../Profile.header';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import StartYourJourneySection from './components/StartYourJourneySection';
import CreateProfileActionFooter from './CreateProfileAction.footer';

const ProfilePage = () => {
	const createArtistSheetApi = useSheet();
	const { refetchUser, userData } = useUserAppContext();
	const { refetchUserArtists } = useUserAppContext();

	const refresh = () => {
		refetchUserArtists();
		refetchUser();
	};

	const refreshControl = useRefresh(refresh);

	const FooterComponent = useCallback(
		() => (
			<CreateProfileActionFooter createArtistSheetApi={createArtistSheetApi} />
		),
		[]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<ProfilePageHeader name={userData.handle} />
			<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
				<HeaderSection />
				<StartYourJourneySection />
				<MenuSection />
				<LogoutSection />
			</ScrollView>
		</BasePage>
	);
};

export default ProfilePage;
