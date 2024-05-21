import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import React, { useCallback } from 'react';
import CreateProfileActionFooter from './components/CreateProfileActionFooter';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import MenuSection from './components/MenuSection';
import SelectAccountSection from './components/SelectAccountSection';
import useProfilePage from './useProfilePage';

const ProfilePage = () => {
	const { createArtistSheetApi, createHostSheetApi } = useProfilePage();

	const FooterComponent = useCallback(
		() => (
			<CreateProfileActionFooter
				createArtistSheetApi={createArtistSheetApi}
				createHostSheetApi={createHostSheetApi}
			/>
		),
		[]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
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

export default ProfilePage;
