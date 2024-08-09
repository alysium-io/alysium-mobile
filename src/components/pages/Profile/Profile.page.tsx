import { HeaderSafeArea } from '@atomic';
import { BasePage } from '@organisms';
import {
	AboutAlysiumBottomSheet,
	PrivacyPolicyBottomSheet,
	TermsOfServiceBottomSheet
} from '@popups';
import React from 'react';
import { ScrollView } from 'react-native';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import MenuSection from './components/MenuSection';
import SelectAccountSection from './components/SelectAccountSection';
import ProfilePageHeader from './Profile.header';
import useProfilePage from './useProfilePage';

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

	const {
		termsOfServiceSheetApi,
		privacyPolicySheetApi,
		aboutAlysiumSheetApi
	} = useProfilePage();

	return (
		<BasePage>
			<ProfilePageHeader />
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<HeaderSection />
					<SelectAccountSection />
					<MenuSection
						termsOfServiceSheetApi={termsOfServiceSheetApi}
						privacyPolicySheetApi={privacyPolicySheetApi}
						aboutAlysiumSheetApi={aboutAlysiumSheetApi}
					/>
					<LogoutSection />
				</ScrollView>
			</HeaderSafeArea>
			<PrivacyPolicyBottomSheet sheetApi={privacyPolicySheetApi} />
			<TermsOfServiceBottomSheet sheetApi={termsOfServiceSheetApi} />
			<AboutAlysiumBottomSheet sheetApi={aboutAlysiumSheetApi} />
		</BasePage>
	);
};

export default ProfilePage;
