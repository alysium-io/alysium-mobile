import { Text } from '@atomic';
import { Formatting } from '@etc';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { UserArtistsFollowingPageHeader } from '../UserArtistsFollowing';
import useUserTagsFollowingPage from './useUserTagsFollowingPage';

const UserTagsFollowingPage = () => {
	const { userTagsFollowingData, nextPage } = useUserTagsFollowingPage();
	const { behavior } = useBehaviorContext();
	const { tagPage } = useNavigation();

	useEffect(() => {
		behavior(BehaviorAction.PAGEVIEW_USER_TAGS_FOLLOWING);
	}, []);

	const Header = () => (
		<Text variant='section-header-1' margin='m'>
			Following
		</Text>
	);

	if (!userTagsFollowingData) {
		return null;
	}

	return (
		<BasePage>
			<UserArtistsFollowingPageHeader />
			<FlatList
				data={userTagsFollowingData}
				ListHeaderComponent={Header}
				keyExtractor={(item) => item.tag.tag_uid}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				renderItem={({ item }) => (
					<ContentListItem
						key={item.tag.tag_uid}
						onPress={() => tagPage(item.tag.tag_uid)}
						titleTextProps={{
							title: item.tag.name,
							bottomSubtext: Formatting.formatNumFollowers(
								item.tag.spotify_followers_sum
							)
						}}
						profileImageProps={{
							defaultImageProps: {
								icon: 'tag'
							}
						}}
					/>
				)}
			/>
		</BasePage>
	);
};

export default UserTagsFollowingPage;
