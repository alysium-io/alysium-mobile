import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import MenuSection from './components/MenuSection';

const ProfilePage = () => {
	// Create Host & Artist footer (on hold)
	// const FooterComponent = useCallback(
	// 	() => (
	// 		<CreateProfileActionFooter
	// 			createArtistSheetApi={createArtistSheetApi}
	// 			createHostSheetApi={createHostSheetApi}
	// 		/>
	// 	),
	// 	[]
	// );

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<HeaderSection />
					<MenuSection />
					<LogoutSection />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default ProfilePage;
