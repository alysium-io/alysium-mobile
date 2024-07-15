import { HeaderSafeArea } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { ScrollView } from 'react-native';
import HeaderSection from './components/HeaderSection';

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
					{/* <MenuSection /> */}
					{/* <LogoutSection /> */}
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default ProfilePage;
