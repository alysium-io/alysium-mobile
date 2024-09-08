import { useNavigation } from '@hooks';
import { ContentListItemWithRank } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import { TagPageRouteProp } from '@types';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import Header from './components/Header';
import TagPageHeader from './Tag.header';
import useTagPage from './useTagPage';

const TagPage = () => {
	const route = useRoute<TagPageRouteProp>();
	const { artistPage } = useNavigation();
	const { behavior } = useBehaviorContext();
	const {
		tagData,
		tagArtists,
		correlatedTagsData,
		nextPage,
		onPressFollowButton
	} = useTagPage(route.params.tag_uid);

	useEffect(() => {
		behavior(BehaviorAction.PAGEVIEW_PUBLIC_TAG);
	}, []);

	if (!tagData || !tagArtists || !correlatedTagsData) {
		return null;
	}

	return (
		<BasePage>
			<TagPageHeader title={tagData.name} />
			<FlatList
				data={tagArtists}
				ListHeaderComponent={
					<Header
						tagData={tagData}
						correlatedTagsData={correlatedTagsData}
						onPressFollowButton={onPressFollowButton}
					/>
				}
				keyExtractor={(item) => item.artist.artist_uid}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				refreshing={true}
				renderItem={({ item, index }) => (
					<ContentListItemWithRank
						key={item.artist.artist_uid}
						rank={index + 1}
						onPress={() => artistPage(item.artist.artist_uid)}
						titleTextProps={{
							title: item.artist.name,
							bottomSubtext:
								item.artist.artist_spotify_data?.followers !== null &&
								item.artist.artist_spotify_data?.followers !== undefined
									? item.artist.artist_spotify_data.followers.toLocaleString() +
									  ' follower' +
									  (item.artist.artist_spotify_data.followers === 1 ? '' : 's')
									: 'unknown followers'
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
