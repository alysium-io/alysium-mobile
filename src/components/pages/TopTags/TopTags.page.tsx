import { Formatting } from '@etc';
import { useNavigation } from '@hooks';
import { ContentListItemWithRank } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import { FlatList } from 'react-native';
import TopTagsHeader from './TopTags.header';
import useTopTagsPage from './useTopTagsPage';

const TopTagsPage = () => {
	const { topTagsData, nextPage } = useTopTagsPage();
	const { tagPage } = useNavigation();

	return (
		<BasePage>
			<TopTagsHeader />
			<FlatList
				data={topTagsData}
				keyExtractor={(item) => item.tag_uid}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				renderItem={({ item }) => (
					<ContentListItemWithRank
						key={item.tag_uid}
						onPress={() =>
							tagPage(item.tag_uid, {
								from: 'TopTagsPage',
								to: 'TagPage',
								to_uid: item.tag_uid,
								using: 'TOP_TAGS_PAGE_TAG'
							})
						}
						titleTextProps={{
							title: item.name,
							bottomSubtext: Formatting.formatNumFollowers(
								item.spotify_followers_sum
							)
						}}
						rank={item.tag_rank}
					/>
				)}
			/>
		</BasePage>
	);
};

export default TopTagsPage;
