import { View } from '@atomic';
import { BasePage, Parallax } from '@organisms';
import { ApiIdentifier } from '@types';
import React from 'react';
import ArtistPageHeader from '../../Artist.header';
import SubHeader from '../../components/SubHeader';
import ActionButtons from './components/ActionButtons';
import ArtistTags from './components/ArtistTags';
import GoToSpotifyButton from './components/GoToSpotifyButton';
import useUserPage from './useUserPage';

interface UserProps {
	artist_uid: ApiIdentifier;
}

const User: React.FC<UserProps> = ({ artist_uid }) => {
	const { artistData, onPressFollowButton } = useUserPage(artist_uid);

	if (!artistData) {
		return null;
	}
	console.log(artistData);
	return (
		<BasePage>
			<ArtistPageHeader title={artistData.name} />
			<Parallax
				bannerTitleProps={{
					title: artistData.name
				}}
				bannerImageProps={{
					image: artistData.profile_image?.large.key
				}}
			>
				<View margin='m'>
					<SubHeader artistData={artistData} />
					<ActionButtons
						artistData={artistData}
						onPressFollowButton={onPressFollowButton}
					/>
					<ArtistTags artistData={artistData} />
					<GoToSpotifyButton artistData={artistData} />
				</View>
			</Parallax>
		</BasePage>
	);
};

export default User;
