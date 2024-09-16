import { View } from '@atomic';
import { searchApiSlice } from '@flux/api/search';
import { SearchItem, TagSearchItem } from '@flux/api/search/search.entity';
import { usePagination } from '@hooks';
import { ListItemWithRadio } from '@molecules';
import _ from 'lodash';
import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition
} from 'react-native-reanimated';

interface TagsSearchActivePageProps {
	searchTagsText: string;
	onPressSearchResult: (item: SearchItem) => void;
	clearTagTextInput: () => void;
}

const TagsSearchActivePage: React.FC<TagsSearchActivePageProps> = ({
	searchTagsText,
	onPressSearchResult,
	clearTagTextInput
}) => {
	const { page, defaultLimit } = usePagination();
	const [selectedItems, setSelectedItems] = useState<TagSearchItem[]>([]);

	const { data: correlatedData } = searchApiSlice.useSearchTagsQuery({
		body: {
			q: '',
			correlated_tag_uids: selectedItems.map((i) => i.uid),
			sort: ['spotify_followers_sum:desc']
		},
		query: {
			page: page,
			limit: defaultLimit
		}
	});

	const { data: tagSearchResults } = searchApiSlice.useSearchTagsQuery(
		{
			body: { q: searchTagsText },
			query: { page: 1, limit: 25 }
		},
		{ skip: searchTagsText.length === 0 }
	);

	const onPressSearchedTag = (item: TagSearchItem) => {
		setSelectedItems([...selectedItems, item]);
		clearTagTextInput();
	};

	const addSelectedItem = (item: TagSearchItem) => {
		setSelectedItems([...selectedItems, item]);
	};

	const removeSelectedItem = (item: TagSearchItem) => {
		setSelectedItems(selectedItems.filter((i) => i.uid !== item.uid));
	};

	return (
		<Animated.ScrollView style={{ overflow: 'visible' }}>
			{_.orderBy(selectedItems, ['spotifyFollowersSum'], ['desc']).map(
				(selectedItem) => (
					<View key={selectedItem.uid} animated layout={LinearTransition}>
						<ListItemWithRadio
							id={selectedItem.uid}
							titleTextProps={{
								title: selectedItem.name,
								bottomSubtext: `${selectedItem.spotifyFollowersSum.toLocaleString()} followers`
							}}
							radioButtonProps={{
								active: true,
								onPress: () => removeSelectedItem(selectedItem)
							}}
							onPress={() => onPressSearchResult(selectedItem)}
						/>
					</View>
				)
			)}
			<If condition={searchTagsText.length === 0}>
				<Then>
					{_.orderBy(
						correlatedData?.hits.filter(
							(i) => !selectedItems.some((item) => item.uid === i.uid)
						),
						['spotifyFollowersSum'],
						['desc']
					).map((i) => (
						<View key={i.uid} animated layout={LinearTransition}>
							<ListItemWithRadio
								id={i.uid}
								titleTextProps={{
									title: i.name,
									bottomSubtext: `${i.spotifyFollowersSum.toLocaleString()} followers`
								}}
								radioButtonProps={{
									active: selectedItems.some((item) => item.uid === i.uid),
									onPress: () => addSelectedItem(i)
								}}
								onPress={() => onPressSearchResult(i)}
							/>
						</View>
					))}
				</Then>
				<Else>
					<View animated entering={FadeIn} exiting={FadeOut}>
						{tagSearchResults?.hits.map((result) => (
							<ListItemWithRadio
								key={result.uid}
								id={result.uid}
								titleTextProps={{
									title: result.name,
									bottomSubtext: `${result.spotifyFollowersSum.toLocaleString()} followers`
								}}
								radioButtonProps={{
									active: selectedItems.some((item) => item.uid === result.uid),
									onPress: () => onPressSearchedTag(result)
								}}
								onPress={() => onPressSearchResult(result)}
							/>
						))}
					</View>
				</Else>
			</If>
		</Animated.ScrollView>
	);
};

export default TagsSearchActivePage;
