import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, Text, View } from '@atomic';
import { Vibrator } from '@etc';
import { tagApiSlice } from '@flux/api/tag';
import { useNavigation } from '@hooks';
import {
	BlockListItem,
	Button,
	ContentListItem,
	SelfAwareScrollView,
	useSelfAwareScrollView
} from '@molecules';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import { StandardFeedback } from '@templates';
import React, { useRef } from 'react';
import { View as RNView } from 'react-native';
import { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import ArtistsFollowingButton from './ArtistsFollowingButton';
import TagsFollowingButton from './TagsFollowingButton';

const SearchInactivePage: React.FC = () => {
	const { userData } = useUserAppContext();
	const { behavior } = useBehaviorContext();
	const {
		userArtistsFollowingPage,
		userTagsFollowingPage,
		tagPage,
		topTagsPage
	} = useNavigation();

	const { data: discoverTagsData, refetch: refetchDiscoverTags } =
		tagApiSlice.useDiscoverTagsQuery({
			query: { limit: 5 }
		});

	const onPressRefreshDiscoverTags = () => {
		Vibrator.rigid();
		refetchDiscoverTags().then(() => behavior('REFRESH_HOME_DISCOVER_TAGS'));
	};

	const selfAwareScrollViewApi = useSelfAwareScrollView();
	const feedbackRef = useRef<RNView>(null);

	return (
		<SelfAwareScrollView
			selfAwareScrollViewApi={selfAwareScrollViewApi}
			entering={FadeIn.duration(300)}
			exiting={FadeOut.duration(300)}
			layout={LinearTransition.duration(300)}
		>
			<Section marginBottom='l'>
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
				<TagsFollowingButton
					onPress={() =>
						userTagsFollowingPage({
							from: 'SearchPage',
							to: 'UserTagsFollowingPage',
							using: 'SEARCH_INACTIVE_PAGE_USER_TAGS_FOLLOWING'
						})
					}
					titleTextProps={{
						title: 'Tags',
						bottomSubtext:
							userData.num_tags_following.toLocaleString() + ' following'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'tag',
							backgroundColor: 'search-inactive-page.tags-following.image.bg',
							iconColor: 'search-inactive-page.tags-following.image.icon'
						}
					}}
				/>
				<ContentListItem
					onPress={() =>
						topTagsPage({
							from: 'SearchPage',
							to: 'TopTagsPage',
							using: 'SEARCH_INACTIVE_PAGE_TOP_TAGS'
						})
					}
					titleTextProps={{
						title: 'Top Tags',
						bottomSubtext: 'Explore popular tags'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'rank',
							backgroundColor: 'search-inactive-page.top-tags.image.bg',
							iconColor: 'search-inactive-page.top-tags.image.icon'
						}
					}}
				/>
			</Section>
			<Section margin='m' marginBottom='none'>
				<View
					marginBottom='m'
					flexDirection='row'
					justifyContent='space-between'
				>
					<Text variant='section-header-1'>Discover</Text>
				</View>
				{discoverTagsData?.map((tag) => (
					<BlockListItem
						key={tag.tag_uid}
						icon='tag'
						onPress={() =>
							tagPage(tag.tag_uid, {
								from: 'SearchPage',
								to: 'TagPage',
								to_uid: tag.tag_uid,
								using: 'SEARCH_INACTIVE_PAGE_DISCOVER_TAG'
							})
						}
						titleTextProps={{
							title: tag.name,
							bottomSubtext:
								tag.num_artists.toLocaleString() +
								' artist' +
								(tag.num_artists === 1 ? '' : 's')
						}}
					/>
				))}
				<View marginVertical='m'>
					<Button onPress={onPressRefreshDiscoverTags} text='Shuffle' />
				</View>
			</Section>
			<View ref={feedbackRef}>
				<Section marginVertical='m'>
					<Text variant='section-header-1' marginHorizontal='m'>
						Feedback
					</Text>
					<StandardFeedback
						onFocus={() =>
							selfAwareScrollViewApi.onPressScrollViewElement(feedbackRef)
						}
					/>
				</Section>
			</View>
		</SelfAwareScrollView>
	);
};

export default SearchInactivePage;
