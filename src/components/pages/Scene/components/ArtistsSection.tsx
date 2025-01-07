import { Section, Text } from '@atomic';
import { sceneApiSlice } from '@flux/api/scene';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { ContentListItemsLoading } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import { Case, Switch } from 'react-if';

interface ArtistsSectionProps {
	scene_uid: NanoId;
}

const ArtistsSection: React.FC<ArtistsSectionProps> = ({ scene_uid }) => {
	const { artistPage } = useNavigation();
	const { data, isLoading } = sceneApiSlice.useFindSceneArtistsQuery({
		params: {
			scene_uid
		}
	});

	if (isLoading) {
		return <ContentListItemsLoading />;
	}

	return (
		<Switch>
			<Case condition={data?.length}>
				<Section>
					{data?.map((artist) => (
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
			</Case>
			<Case condition={!data?.length}>
				<Section marginTop='m'>
					<Text variant='paragraph-medium' textAlign='center'>
						No artists found
					</Text>
				</Section>
			</Case>
		</Switch>
	);
};

export default ArtistsSection;
