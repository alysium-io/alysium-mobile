import { Section, Text } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { formatNumber } from '@src/etc/numeral';
import { ApiIdentifier } from '@types';
import React from 'react';

interface RelatedArtistsProps {
	artist_uid: ApiIdentifier;
}

const RelatedArtists: React.FC<RelatedArtistsProps> = ({ artist_uid }) => {
	const { artistPage } = useNavigation();
	const { data: relatedArtists } = artistApiSlice.usePublicFindRelatedQuery({
		params: {
			artist_uid
		}
	});

	return (
		<Section>
			<Text variant='section-header-1' margin='m'>
				Related Artists
			</Text>
			{relatedArtists?.map((artist) => {
				return (
					<ContentListItem
						key={artist.artist_uid}
						onPress={() => artistPage(artist.artist_uid)}
						titleTextProps={{
							title: artist.name,
							bottomSubtext:
								formatNumber(artist.artist_spotify_data.followers ?? 0) +
								' followers'
						}}
						profileImageProps={{
							image: artist.profile_image?.small.key,
							defaultImageProps: {
								icon: 'artist'
							}
						}}
					/>
				);
			})}
		</Section>
	);
};

export default RelatedArtists;
