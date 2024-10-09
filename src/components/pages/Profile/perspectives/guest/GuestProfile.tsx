import { Section, Text } from '@atomic';
import { BasePage } from '@organisms';
import { ThemeModeSettings, ThemePicker } from '@templates';
import React from 'react';
import { ScrollView } from 'react-native';
import MenuSection from '../../components/MenuSection';
import GuestProfilePageHeader from './GuestProfile.header';
import HeaderSection from './components/HeaderSection';
import SignUpActionFooter from './components/SignUpActionFooter';

const ProfilePage = () => {
	return (
		<BasePage FooterComponent={SignUpActionFooter}>
			<GuestProfilePageHeader />
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
				<MenuSection />
			</ScrollView>
		</BasePage>
	);
};

export default ProfilePage;
