import { HeaderSafeArea, Text } from '@atomic';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import { FlatList } from 'react-native';
import useUserArtistsFollowingPage from './useUserArtistsFollowingPage';

const UserArtistsFollowingPage = () => {
	const { userArtistsFollowingData, nextPage } = useUserArtistsFollowingPage();
	const { artistPage } = useNavigation();

	if (!userArtistsFollowingData) {
		return null;
	}

	const Header = () => (
		<Text variant='section-header-1' margin='m'>
			Following
		</Text>
	);

	return (
		<BasePage>
			<HeaderSafeArea>
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

export default UserArtistsFollowingPage;
