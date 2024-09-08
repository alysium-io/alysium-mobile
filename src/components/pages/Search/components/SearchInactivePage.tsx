import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, Text, View } from '@atomic';
import { tagApiSlice } from '@flux/api/tag';
import { useNavigation } from '@hooks';
import { BlockListItem, ContentListItem } from '@molecules';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition
} from 'react-native-reanimated';

interface SearchInactivePageProps {}

const SearchInactivePage: React.FC<SearchInactivePageProps> = () => {
	const { userData } = useUserAppContext();
	const { behavior } = useBehaviorContext();
	const { userArtistsFollowingPage, userTagsFollowingPage, tagPage } =
		useNavigation();

	const {
		data: discoverTagsData,
		isLoading: isDiscoverTagsLoading,
		error: discoverTagsError,
		refetch: refetchDiscoverTags
	} = tagApiSlice.useDiscoverQuery(undefined);

	const onPressRefreshDiscoverTags = () => {
		refetchDiscoverTags().then(() =>
			behavior(BehaviorAction.REFRESH_HOME_DISCOVER_TAGS)
		);
	};

	return (
		<Animated.ScrollView
			entering={FadeIn.duration(300)}
			exiting={FadeOut.duration(300)}
			style={{ overflow: 'visible' }}
			layout={LinearTransition.duration(300)}
		>
			<Section marginBottom='l'>
				<ContentListItem
					onPress={userArtistsFollowingPage}
					titleTextProps={{
						title: 'Artists',
						bottomSubtext:
							userData.num_artists_following.toLocaleString() + ' following'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'artist',
							backgroundColor: 'palette.p.medium',
							iconColor: 'palette.p.light'
						}
					}}
				/>
				<ContentListItem
					onPress={userTagsFollowingPage}
					titleTextProps={{
						title: 'Tags',
						bottomSubtext:
							userData.num_tags_following.toLocaleString() + ' following'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'tag',
							backgroundColor: 'palette.t.medium',
							iconColor: 'palette.t.light'
						}
					}}
				/>
			</Section>
			<Section margin='m'>
				<View
					marginBottom='m'
					flexDirection='row'
					justifyContent='space-between'
				>
					<Text variant='section-header-1'>Discover</Text>
					<TouchableOpacity
						onPress={onPressRefreshDiscoverTags}
						activeOpacity={0.9}
					>
						<Text variant='paragraph-small-medium' color='palette.p.medium'>
							Refresh
						</Text>
					</TouchableOpacity>
				</View>
				{discoverTagsData?.map((tag) => (
					<BlockListItem
						key={tag.tag_uid}
						icon='tag'
						onPress={() => tagPage(tag.tag_uid)}
						titleTextProps={{
							title: tag.name,
							bottomSubtext:
								tag.num_artists.toLocaleString() +
								' artist' +
								(tag.num_artists === 1 ? '' : 's')
						}}
					/>
				))}
			</Section>
		</Animated.ScrollView>
	);
};

export default SearchInactivePage;
