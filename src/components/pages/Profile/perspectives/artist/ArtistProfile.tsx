import { View } from '@atomic';
import { useNavigation } from '@hooks';
import { BasePage } from '@organisms';
import SimpleButton from '@src/components/molecules/Buttons/SimpleButton';
import React from 'react';
import { ScrollView } from 'react-native';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import ArtistProfilePageHeader from './ArtistProfile.header';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import ShareEpkSection from './components/ShareEpkSection';

const ArtistProfile = () => {
	const { editArtistPage } = useNavigation();
	return (
		<BasePage>
			<ArtistProfilePageHeader />
			<ScrollView alwaysBounceVertical>
				<HeaderSection />
				<View margin='m'>
					<SimpleButton onPress={editArtistPage} />
				</View>
				<ShareEpkSection />
				<SelectAccountSection />
				<MenuSection />
				<LogoutSection />
			</ScrollView>
		</BasePage>
	);
};

export default ArtistProfile;
