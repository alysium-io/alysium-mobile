import { View } from '@atomic';
import { BasePage, Parallax } from '@organisms';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import { ApiIdentifier } from '@types';
import React, { useEffect } from 'react';
import ArtistPageHeader from '../../Artist.header';
import ActionButtons from './components/ActionButtons';
import ArtistTags from './components/ArtistTags';
import GoToSpotifyButton from './components/GoToSpotifyButton';
import RelatedArtists from './components/RelatedArtists';
import useUserPage from './useUserPage';

interface UserProps {
	artist_uid: ApiIdentifier;
}

const User: React.FC<UserProps> = ({ artist_uid }) => {
	const { artistData, onPressFollowButton } = useUserPage(artist_uid);
	const { behavior } = useBehaviorContext();

	useEffect(() => {
		behavior(BehaviorAction.PAGEVIEW_PUBLIC_ARTIST);
	}, []);

	if (!artistData) {
		return null;
	}

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
					<ActionButtons
						artistData={artistData}
						onPressFollowButton={onPressFollowButton}
					/>
					<ArtistTags artistData={artistData} />
					<GoToSpotifyButton artistData={artistData} />
				</View>
				<RelatedArtists artist_uid={artist_uid} />
			</Parallax>
		</BasePage>
	);
};

export default User;
