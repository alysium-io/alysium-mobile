import { BasePage } from '@organisms';
import React from 'react';
import { ScrollView } from 'react-native';
import MenuSection from '../../components/MenuSection';
import GuestProfilePageHeader from './GuestProfile.header';
import HeaderSection from './components/HeaderSection';
import SignUpActionFooter from './components/SignUpActionFooter';
import StartYourJourneySection from './components/StartYourJourneySection';

const ProfilePage = () => {
	return (
		<BasePage FooterComponent={SignUpActionFooter}>
			<GuestProfilePageHeader />
			<ScrollView alwaysBounceVertical>
				<HeaderSection />
				<StartYourJourneySection />
				<MenuSection />
			</ScrollView>
		</BasePage>
	);
};

export default ProfilePage;
