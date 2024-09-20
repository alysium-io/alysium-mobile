import { BasePage } from '@organisms';
import {
	AboutAlysiumBottomSheet,
	PrivacyPolicyBottomSheet,
	TermsOfServiceBottomSheet
} from '@popups';
import React from 'react';
import { ScrollView } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import LogoutSection from '../../components/LogoutSection';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import ProfilePageHeader from '../../Profile.header';
import useProfilePage from '../../useProfilePage';

const ProfilePage = () => {
	const {
		termsOfServiceSheetApi,
		privacyPolicySheetApi,
		aboutAlysiumSheetApi
	} = useProfilePage();

	return (
		<BasePage>
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
