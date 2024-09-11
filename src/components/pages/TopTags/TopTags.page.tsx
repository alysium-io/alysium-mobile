import { Formatting } from '@etc';
import { useNavigation } from '@hooks';
import { ContentListItemWithRank } from '@molecules';
import { BasePage } from '@organisms';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import TopTagsHeader from './TopTags.header';
import useTopTagsPage from './useTopTagsPage';

const TopTagsPage = () => {
	const { topTagsData, nextPage } = useTopTagsPage();
	const { behavior } = useBehaviorContext();
	const { tagPage } = useNavigation();

	useEffect(() => {
		behavior(BehaviorAction.PAGEVIEW_TOP_TAGS);
	}, []);

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
						onPress={() => tagPage(item.tag_uid)}
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
