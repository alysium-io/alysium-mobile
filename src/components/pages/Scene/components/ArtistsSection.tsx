import { Section } from '@atomic';
import { sceneApiSlice } from '@flux/api/scene';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { NanoId } from '@types';
import React from 'react';

interface ArtistsSectionProps {
	scene_uid: NanoId;
}

const ArtistsSection: React.FC<ArtistsSectionProps> = ({ scene_uid }) => {
	const { artistPage } = useNavigation();
	const { data: sceneArtists } = sceneApiSlice.useFindSceneArtistsQuery({
		params: {
			scene_uid
		}
	});

	return (
		<Section>
			{sceneArtists?.map((artist) => (
				<ContentListItem
					key={artist.artist.artist_uid}
					onPress={() =>
						artistPage(artist.artist.artist_uid, {
							from: 'ScenePage',
							from_uid: scene_uid,
							to: 'ArtistPage',
							to_uid: artist.artist.artist_uid,
							using: 'SCENE_PAGE_ARTIST_CONTENT_LIST_ITEM'
						})
					}
					titleTextProps={{
						title: artist.artist.name,
						bottomSubtext: 'artist'
					}}
					profileImageProps={{
						image: artist.artist.profile_image?.small.key,
						defaultImageProps: {
							icon: 'artist'
						}
					}}
				/>
			))}
		</Section>
	);
};

export default ArtistsSection;
