import { BasePage } from '@organisms';
import {
	AboutAlysiumBottomSheet,
	PrivacyPolicyBottomSheet,
	TermsOfServiceBottomSheet
} from '@popups';
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import LogoutSection from '../../components/LogoutSection';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import ProfilePageHeader from '../../Profile.header';
import useProfilePage from '../../useProfilePage';
import CreateProfileActionFooter from './components/CreateProfileActionFooter';

const ProfilePage = () => {
	const {
		createArtistSheetApi,
		termsOfServiceSheetApi,
		privacyPolicySheetApi,
		aboutAlysiumSheetApi
	} = useProfilePage();

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
				<MenuSection
					termsOfServiceSheetApi={termsOfServiceSheetApi}
					privacyPolicySheetApi={privacyPolicySheetApi}
					aboutAlysiumSheetApi={aboutAlysiumSheetApi}
				/>
				<LogoutSection />
			</ScrollView>
			<PrivacyPolicyBottomSheet sheetApi={privacyPolicySheetApi} />
			<TermsOfServiceBottomSheet sheetApi={termsOfServiceSheetApi} />
			<AboutAlysiumBottomSheet sheetApi={aboutAlysiumSheetApi} />
		</BasePage>
	);
};

export default ProfilePage;
