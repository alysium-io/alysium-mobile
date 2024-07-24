import { Section, Text } from '@atomic';
import { CreateUserArtistsFollowingResponseDto } from '@flux/api/user-artists-following/dto/user-artists-following-create.dto';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

interface ArtistsProps {
	userArtistsFollowingData: CreateUserArtistsFollowingResponseDto[];
}

const Artists: React.FC<ArtistsProps> = ({ userArtistsFollowingData }) => {
	const { artistPage } = useNavigation();

	return (
		<Section>
			<Text variant='section-header-1' margin='m'>
				Following
			</Text>
			{userArtistsFollowingData.map((artist, index) => (
				<ContentListItem
					key={index}
					onPress={() => artistPage(artist.artist.artist_uid)}
					titleTextProps={{
						title: artist.artist.name,
						bottomSubtext: 'Los Angeles, CA'
					}}
					profileImageProps={{
						image: artist.artist.profile_image?.url,
						defaultImageProps: {
							icon: 'artist'
						}
					}}
				/>
			))}
		</Section>
	);
};

export default Artists;
