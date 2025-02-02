import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { RefreshControl, ScrollView } from '@atomic';
import { useRefresh, useSheet } from '@hooks';
import { BasePage } from '@organisms';
import React, { useCallback } from 'react';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import CreateProfileActionFooter from './CreateProfileAction.footer';
import ProfilePageHeader from './UserProfile.header';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';

const ProfilePage = () => {
	const createArtistSheetApi = useSheet();
	const { refetchUser } = useUserAppContext();
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
			<ProfilePageHeader />
			<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
				<HeaderSection />
				<SelectAccountSection />
				<MenuSection />
				<LogoutSection />
			</ScrollView>
		</BasePage>
	);
};

export default ProfilePage;
