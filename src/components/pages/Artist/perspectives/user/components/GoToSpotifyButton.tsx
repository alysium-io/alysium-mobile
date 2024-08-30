import { View } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useLinking } from '@hooks';
import { BlockListItem } from '@molecules';
import React from 'react';

interface GoToSpotifyButtonProps {
	artistData?: PublicFindOneArtistResponseDto;
}

const GoToSpotifyButton: React.FC<GoToSpotifyButtonProps> = ({
	artistData
}) => {
	const { go } = useLinking(
		`spotify:artist:${artistData?.artist_spotify_data.spotify_artist_id}`,
		`https://open.spotify.com/artist/${artistData?.artist_spotify_data.spotify_artist_id}`
	);
	return (
		<View>
			<BlockListItem
				key={artistData?.artist_uid}
				icon='spotify'
				onPress={go}
				titleTextProps={{
					title: 'Go to Spotify',
					bottomSubtext:
						artistData?.artist_spotify_data?.followers !== null &&
						artistData?.artist_spotify_data?.followers !== undefined
							? artistData?.artist_spotify_data.followers?.toLocaleString() +
							  ' follower' +
							  (artistData?.artist_spotify_data.followers === 1 ? '' : 's')
							: 'unknown followers'
				}}
			/>
		</View>
	);
};

export default GoToSpotifyButton;
