import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { RefreshControl, ScrollView, View } from '@atomic';
import { useNavigation, useRefresh } from '@hooks';
import { BasePage } from '@organisms';
import SimpleButton from '@src/components/molecules/Buttons/SimpleButton';
import React from 'react';
import MenuSection from '../../components/MenuSection';
import SelectAccountSection from '../../components/SelectAccountSection';
import ArtistProfilePageHeader from './ArtistProfile.header';
import HeaderSection from './components/HeaderSection';
import LogoutSection from './components/LogoutSection';
import ShareEpkSection from './components/ShareEpkSection';

const ArtistProfile = () => {
	const { artist_uid, refetchArtist } = useArtistAppContext();
	const { editArtistPage, artistPage } = useNavigation();
	const { refetchUserArtists } = useUserAppContext();

	const refresh = () => {
		refetchUserArtists();
		refetchArtist();
	};

	const refreshControl = useRefresh(refresh);

	return (
		<BasePage>
			<ArtistProfilePageHeader />
			<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
				<HeaderSection />
				<View margin='m' columnGap='m' flexDirection='row'>
					<SimpleButton
						onPress={editArtistPage}
						style={{ flex: 1 }}
						text='Edit Profile'
					/>
					<SimpleButton
						onPress={() =>
							artistPage(artist_uid, {
								to: 'ArtistPage',
								to_uid: artist_uid,
								from: 'ProfilePage',
								from_uid: artist_uid,
								using: 'ARTIST_PROFILE_VIEW_PAGE_SIMPLE_BUTTON'
							})
						}
						style={{ flex: 1 }}
						text='View Page'
						afterIconProps={{ name: 'arrow-right' }}
					/>
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
