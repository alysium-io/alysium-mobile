import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, Text, View } from '@atomic';
import { DiscoverTagsResponseDto } from '@flux/api/tag/dto/tag-discover.dto';
import { useNavigation } from '@hooks';
import { BlockListItem, ContentListItem } from '@molecules';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FadeInDown, FadeOutUp } from 'react-native-reanimated';

interface SearchInactivePageProps {
	discoverTagsData?: DiscoverTagsResponseDto;
	refetchDiscoverTags: () => void;
}

const SearchInactivePage: React.FC<SearchInactivePageProps> = ({
	discoverTagsData,
	refetchDiscoverTags
}) => {
	const { userData } = useUserAppContext();
	const { userArtistsFollowingPage, userTagsFollowingPage, tagPage } =
		useNavigation();

	return (
		<View
			animated
			entering={FadeInDown.duration(250)}
			exiting={FadeOutUp.duration(250)}
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
					<TouchableOpacity onPress={refetchDiscoverTags} activeOpacity={0.9}>
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
							title: tag.name
						}}
					/>
				))}
			</Section>
		</View>
	);
};

export default SearchInactivePage;
