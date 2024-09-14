import { Section, Text } from '@atomic';
import { Formatting } from '@etc';
import { artistApiSlice } from '@flux/api/artist';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
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

	const onPressRelatedArtist = (nextArtistUid: ApiIdentifier) => {
		artistPage(nextArtistUid, {
			from: 'ArtistPage',
			from_uid: artist_uid,
			to: 'ArtistPage',
			to_uid: nextArtistUid,
			using: 'ARTIST_PAGE_RELATED_ARTIST'
		});
	};

	return (
		<Section>
			<Text variant='section-header-1' margin='m'>
				Related Artists
			</Text>
			{relatedArtists?.map((artist) => {
				return (
					<ContentListItem
						key={artist.artist_uid}
						onPress={() => onPressRelatedArtist(artist.artist_uid)}
						titleTextProps={{
							title: artist.name,
							bottomSubtext: Formatting.formatNumFollowers(
								artist.artist_spotify_data.followers
							)
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
