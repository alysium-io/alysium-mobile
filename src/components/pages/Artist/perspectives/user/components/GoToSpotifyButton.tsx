import { View } from '@atomic';
import { Formatting } from '@etc';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useLinking } from '@hooks';
import { BlockListItem } from '@molecules';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';

interface GoToSpotifyButtonProps {
	artistData: PublicFindOneArtistResponseDto;
}

const GoToSpotifyButton: React.FC<GoToSpotifyButtonProps> = ({
	artistData
}) => {
	const { behavior } = useBehaviorContext();
	const { go } = useLinking(
		`spotify:artist:${artistData.artist_spotify_data?.spotify_artist_id}`,
		`https://open.spotify.com/artist/${artistData.artist_spotify_data?.spotify_artist_id}`
	);

	const onPressGoToSpotify = () => {
		behavior('EXTERNAL_LINK_SPOTIFY_ARTIST', {
			artist_uid: artistData.artist_uid
		});
		go();
	};

	return (
		<View>
			<BlockListItem
				key={artistData.artist_uid}
				icon='spotify'
				onPress={onPressGoToSpotify}
				titleTextProps={{
					title: 'Go to Spotify',
					bottomSubtext: Formatting.formatNumFollowers(
						artistData.artist_spotify_data?.followers
					)
				}}
			/>
		</View>
	);
};

export default GoToSpotifyButton;
