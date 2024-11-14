import { Text } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import { FlatList } from 'react-native';
import UserArtistsFollowingPageHeader from './UserArtistsFollowing.header';
import useUserArtistsFollowingPage from './useUserArtistsFollowingPage';

const UserArtistsFollowingPage = () => {
	const { userArtistsFollowingData, nextPage } = useUserArtistsFollowingPage();
	const { artistPage } = useNavigation();

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
