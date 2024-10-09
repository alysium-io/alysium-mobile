import { BasePage } from '@organisms';
import React from 'react';
import { ScrollView } from 'react-native';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import ArtistProfilePageHeader from './ArtistProfile.header';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';

const ArtistProfile = () => {
	return (
		<BasePage>
			<ArtistProfilePageHeader />
			<ScrollView alwaysBounceVertical>
				<HeaderSection />
				<SelectAccountSection />
				<MenuSection />
				<LogoutSection />
			</ScrollView>
		</BasePage>
	);
};

export default ArtistProfile;
