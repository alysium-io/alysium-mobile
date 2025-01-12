import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { ScrollView, View } from '@atomic';
import { useNavigation } from '@hooks';
import React from 'react';
import ArtistsFollowingButton from './ArtistsFollowingButton';
import ScenesFollowingButton from './ScenesFollowingButton';

const SearchInactivePage: React.FC = () => {
	const { userData } = useUserAppContext();
	const { userArtistsFollowingPage, userScenesFollowingPage } = useNavigation();

	return (
		<ScrollView>
			<View marginBottom='l'>
				<ArtistsFollowingButton
					onPress={() =>
						userArtistsFollowingPage({
							from: 'SearchPage',
							to: 'UserArtistsFollowingPage',
							using: 'SEARCH_INACTIVE_PAGE_USER_ARTISTS_FOLLOWING'
						})
					}
					titleTextProps={{
						title: 'Artists',
						bottomSubtext:
							userData.num_artists_following.toLocaleString() + ' following'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'artist',
							backgroundColor:
								'search-inactive-page.artists-following.image.bg',
							iconColor: 'search-inactive-page.artists-following.image.icon'
						}
					}}
				/>
				<ScenesFollowingButton
					onPress={() =>
						userScenesFollowingPage({
							from: 'SearchPage',
							to: 'UserScenesFollowingPage',
							using: 'SEARCH_INACTIVE_PAGE_USER_SCENES_FOLLOWING'
						})
					}
					titleTextProps={{
						title: 'Scenes',
						bottomSubtext:
							userData.num_scenes_following.toLocaleString() + ' following'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'location',
							backgroundColor: 'search-inactive-page.scenes-following.image.bg',
							iconColor: 'search-inactive-page.scenes-following.image.icon'
						}
					}}
				/>
			</View>
		</ScrollView>
	);
};

export default SearchInactivePage;
