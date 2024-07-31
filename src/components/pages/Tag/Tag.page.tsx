import { HeaderSafeArea } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItemWithRank } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { TagPageRouteProp } from '@types';
import React from 'react';
import { FlatList } from 'react-native';
import Header from './components/Header';
import useTagPage from './useTagPage';

const TagPage = () => {
	const route = useRoute<TagPageRouteProp>();
	const { tagData, tagArtists, nextPage, onPressFollowButton } = useTagPage(
		route.params.tag_uid
	);
	const { artistPage } = useNavigation();

	if (!tagData || !tagArtists) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<FlatList
					data={tagArtists}
					ListHeaderComponent={
						<Header
							tagData={tagData}
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
								bottomSubtext: 'Los Angeles, CA'
							}}
							profileImageProps={{
								image: item.artist.profile_image?.url,
								defaultImageProps: {
									icon: 'artist'
								}
							}}
						/>
					)}
				/>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default TagPage;
