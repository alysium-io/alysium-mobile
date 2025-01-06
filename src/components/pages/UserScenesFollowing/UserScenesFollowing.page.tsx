import { View } from '@atomic';
import { userScenesFollowingApiSlice } from '@flux/api/user-scenes-following';
import { useNavigation, usePagination } from '@hooks';
import { MenuListItem } from '@molecules';
import { BasePage } from '@organisms';
import { ContentListItemsLoading } from '@templates';
import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserScenesFollowingPageHeader from './UserScenesFollowing.header';

const UserScenesFollowingPage = () => {
	const insets = useSafeAreaInsets();
	const { scenePage } = useNavigation();
	const { page, nextPage, defaultLimit } = usePagination();

	const { data, isLoading } =
		userScenesFollowingApiSlice.useFindAllUserScenesFollowingQuery({
			query: {
				page,
				limit: defaultLimit
			}
		});

	if (isLoading) {
		return (
			<View style={{ marginTop: insets.top }}>
				<ContentListItemsLoading withImage={false} />
			</View>
		);
	}

	if (!data) {
		// TODO: What do you load here?
		return null;
	}

	return (
		<BasePage>
			<UserScenesFollowingPageHeader />
			<FlatList
				data={data}
				keyExtractor={(item) => item.scene.scene_uid}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				renderItem={({ item }) => (
					<MenuListItem
						key={item.scene.scene_uid}
						onPress={() =>
							scenePage(item.scene.scene_uid, {
								from: 'UserScenesFollowingPage',
								to: 'ScenePage',
								to_uid: item.scene.scene_uid,
								using: 'USER_SCENES_FOLLOWING_PAGE_SCENE'
							})
						}
						titleTextProps={{
							title: item.scene.name,
							bottomSubtext: item.scene?.country
						}}
					/>
				)}
			/>
		</BasePage>
	);
};

export default UserScenesFollowingPage;
