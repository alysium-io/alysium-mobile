import { View } from '@atomic';
import { userArtistsFollowingApiSlice } from '@flux/api/user-artists-following';
import { useNavigation, usePagination } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import { ContentListItemsLoading } from '@templates';
import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserArtistsFollowingPageHeader from './UserArtistsFollowing.header';

const UserArtistsFollowingPage = () => {
	const insets = useSafeAreaInsets();
	const { artistPage } = useNavigation();
	const { page, nextPage, defaultLimit } = usePagination();

	const { data, isLoading } =
		userArtistsFollowingApiSlice.useFindAllUserArtistsFollowingQuery({
			query: {
				page,
				limit: defaultLimit
			}
		});

	if (isLoading) {
		return (
			<View style={{ marginTop: insets.top }}>
				<ContentListItemsLoading />
			</View>
		);
	}

	return (
		<BasePage>
			<UserArtistsFollowingPageHeader />
			<FlatList
				data={data}
				keyExtractor={(item) => item.artist.artist_uid}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				renderItem={({ item }) => (
					<ContentListItem
						key={item.artist.artist_uid}
						onPress={() =>
							artistPage(item.artist.artist_uid, {
								from: 'UserArtistsFollowingPage',
								to: 'ArtistPage',
								to_uid: item.artist.artist_uid,
								using: 'USER_ARTISTS_FOLLOWING_PAGE_ARTIST'
							})
						}
						titleTextProps={{
							title: item.artist.name,
							bottomSubtext: item.artist.scene?.scene?.name
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
