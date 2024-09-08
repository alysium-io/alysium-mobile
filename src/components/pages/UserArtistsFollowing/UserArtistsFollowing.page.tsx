import { Text } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import UserArtistsFollowingPageHeader from './UserArtistsFollowing.header';
import useUserArtistsFollowingPage from './useUserArtistsFollowingPage';

const UserArtistsFollowingPage = () => {
	const { userArtistsFollowingData, nextPage } = useUserArtistsFollowingPage();
	const { behavior } = useBehaviorContext();
	const { artistPage } = useNavigation();

	useEffect(() => {
		behavior(BehaviorAction.PAGEVIEW_USER_ARTISTS_FOLLOWING);
	}, []);

	const Header = () => (
		<Text variant='section-header-1' margin='m'>
			Following
		</Text>
	);

	if (!userArtistsFollowingData) {
		return null;
	}

	return (
		<BasePage>
			<UserArtistsFollowingPageHeader />
			<FlatList
				data={userArtistsFollowingData}
				ListHeaderComponent={Header}
				keyExtractor={(item) => item.artist.artist_uid}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				renderItem={({ item }) => (
					<ContentListItem
						key={item.artist.artist_uid}
						onPress={() => artistPage(item.artist.artist_uid)}
						titleTextProps={{
							title: item.artist.name,
							bottomSubtext: 'Los Angeles, CA'
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

export default UserArtistsFollowingPage;
