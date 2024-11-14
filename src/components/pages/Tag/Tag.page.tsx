import { Formatting } from '@etc';
import { useNavigation } from '@hooks';
import { ContentListItemWithRank } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { TagPageRouteProp } from '@types';
import React from 'react';
import { FlatList } from 'react-native';
import Header from './components/Header';
import TagPageHeader from './Tag.header';
import useTagPage from './useTagPage';

const TagPage = () => {
	const route = useRoute<TagPageRouteProp>();
	const { artistPage } = useNavigation();
	const { tagData, tagArtists, correlatedTagsData, nextPage } = useTagPage(
		route.params.tag_uid
	);

	if (!tagData || !tagArtists || !correlatedTagsData) {
		return null;
	}

	return (
		<BasePage>
			<TagPageHeader title={tagData.name} />
			<FlatList
				showsVerticalScrollIndicator={false}
				data={tagArtists}
				ListHeaderComponent={
					<Header tagData={tagData} correlatedTagsData={correlatedTagsData} />
				}
				keyExtractor={(item) => item.artist.artist_uid}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				refreshing={true}
				renderItem={({ item, index }) => (
					<ContentListItemWithRank
						key={item.artist.artist_uid}
						rank={index + 1}
						onPress={() =>
							artistPage(item.artist.artist_uid, {
								from: 'TagPage',
								from_uid: tagData.tag_uid,
								to: 'ArtistPage',
								to_uid: item.artist.artist_uid,
								using: 'TAG_PAGE_RANKED_ARTIST'
							})
						}
						titleTextProps={{
							title: item.artist.name,
							bottomSubtext: Formatting.formatNumFollowers(
								item.artist.num_followers
							)
						}}
						profileImageProps={{
							image: item.artist.profile_image?.small.key,
							defaultImageProps: {
								icon: 'artist'
							}
						}}
					/>
				)}
			/>
		</BasePage>
	);
};

export default TagPage;
