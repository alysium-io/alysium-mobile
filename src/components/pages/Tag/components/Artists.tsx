import { Section, Text } from '@atomic';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import React from 'react';

interface ArtistsProps {
	tagData: FindOneTagResponseDto;
}

const Artists: React.FC<ArtistsProps> = ({ tagData }) => {
	const { artistPage } = useNavigation();

	return (
		<Section>
			<Text variant='section-header-1' margin='m'>
				Artists
			</Text>
			{tagData.artists.map((artist, index) => (
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
