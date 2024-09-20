import { Section, Text } from '@atomic';
import { BasePage } from '@organisms';
import {
	AboutAlysiumBottomSheet,
	PrivacyPolicyBottomSheet,
	TermsOfServiceBottomSheet
} from '@popups';
import { ThemeModeSettings, ThemePicker } from '@templates';
import React from 'react';
import { ScrollView } from 'react-native';
import MenuSection from '../../components/MenuSection';
import ProfilePageHeader from '../../Profile.header';
import useProfilePage from '../../useProfilePage';
import HeaderSection from './components/HeaderSection';
import SignUpActionFooter from './components/SignUpActionFooter';

const ProfilePage = () => {
	const {
		termsOfServiceSheetApi,
		privacyPolicySheetApi,
		aboutAlysiumSheetApi
	} = useProfilePage();

	return (
		<BasePage FooterComponent={SignUpActionFooter}>
			<ProfilePageHeader />
			<ScrollView alwaysBounceVertical>
				<HeaderSection />
				<Section marginBottom='xxxl'>
					<Text
						variant='section-header-2'
						marginHorizontal='m'
						marginBottom='m'
					>
						Theme
					</Text>
					<ThemePicker />
					<ThemeModeSettings />
				</Section>
				<MenuSection
					termsOfServiceSheetApi={termsOfServiceSheetApi}
					privacyPolicySheetApi={privacyPolicySheetApi}
					aboutAlysiumSheetApi={aboutAlysiumSheetApi}
				/>
			</ScrollView>
			<PrivacyPolicyBottomSheet sheetApi={privacyPolicySheetApi} />
			<TermsOfServiceBottomSheet sheetApi={termsOfServiceSheetApi} />
			<AboutAlysiumBottomSheet sheetApi={aboutAlysiumSheetApi} />
		</BasePage>
	);
};

export default ProfilePage;
