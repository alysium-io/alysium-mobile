import { Text } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import { FlatList } from 'react-native';
import { UserArtistsFollowingPageHeader } from '../UserArtistsFollowing';
import useUserTagsFollowingPage from './useUserTagsFollowingPage';

const UserTagsFollowingPage = () => {
	const { userTagsFollowingData, nextPage } = useUserTagsFollowingPage();
	const { tagPage } = useNavigation();

	if (!userTagsFollowingData) {
		return null;
	}

	const Header = () => (
		<Text variant='section-header-1' margin='m'>
			Following
		</Text>
	);

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
							bottomSubtext: 'Los Angeles, CA'
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
