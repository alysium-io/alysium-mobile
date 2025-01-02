import { LView } from '@atomic';
import { Formatting } from '@etc';
import { searchApiSlice } from '@flux/api/search';
import { SearchItem, TagSearchItem } from '@flux/api/search/search.entity';
import { SearchApi, useKeyboard, usePagination } from '@hooks';
import { ListItemWithRadio } from '@molecules';
import _ from 'lodash';
import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import Animated from 'react-native-reanimated';

interface TagsSearchActivePageProps {
	searchTagsApi: SearchApi;
	onPressSearchResult: (item: SearchItem) => void;
}

const TagsSearchActivePage: React.FC<TagsSearchActivePageProps> = ({
	searchTagsApi,
	onPressSearchResult
}) => {
	const { page, defaultLimit } = usePagination();
	const [selectedItems, setSelectedItems] = useState<TagSearchItem[]>([]);
	const { dismiss } = useKeyboard();

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
			body: { q: searchTagsApi.searchText },
			query: { page: 1, limit: 25 }
		},
		{ skip: searchTagsApi.searchText.length === 0 }
	);

	const onPressSearchedTag = (item: TagSearchItem) => {
		setSelectedItems([...selectedItems, item]);
		searchTagsApi.pressClear();
	};

	const addSelectedItem = (item: TagSearchItem) => {
		setSelectedItems([...selectedItems, item]);
	};

	const removeSelectedItem = (item: TagSearchItem) => {
		setSelectedItems(selectedItems.filter((i) => i.uid !== item.uid));
	};

	return (
		<Animated.ScrollView
			style={{ overflow: 'visible' }}
			onScrollBeginDrag={dismiss}
		>
			{_.orderBy(selectedItems, ['spotifyFollowersSum'], ['desc']).map(
				(selectedItem) => (
					<LView key={selectedItem.uid}>
						<ListItemWithRadio
							id={selectedItem.uid}
							titleTextProps={{
								title: selectedItem.name,
								bottomSubtext: Formatting.formatNumFollowers(
									selectedItem.spotifyFollowersSum
								)
							}}
							radioButtonProps={{
								active: true,
								onPress: () => removeSelectedItem(selectedItem)
							}}
							onPress={() => onPressSearchResult(selectedItem)}
						/>
					</LView>
				)
			)}
			<If condition={searchTagsApi.searchText.length === 0}>
				<Then>
					{_.orderBy(
						correlatedData?.hits.filter(
							(i) => !selectedItems.some((item) => item.uid === i.uid)
						),
						['spotifyFollowersSum'],
						['desc']
					).map((i) => (
						<LView key={i.uid}>
							<ListItemWithRadio
								id={i.uid}
								titleTextProps={{
									title: i.name,
									bottomSubtext: Formatting.formatNumFollowers(
										i.spotifyFollowersSum
									)
								}}
								radioButtonProps={{
									active: selectedItems.some((item) => item.uid === i.uid),
									onPress: () => addSelectedItem(i)
								}}
								onPress={() => onPressSearchResult(i)}
							/>
						</LView>
					))}
				</Then>
				<Else>
					<LView>
						{tagSearchResults?.hits.map((result) => (
							<ListItemWithRadio
								key={result.uid}
								id={result.uid}
								titleTextProps={{
									title: result.name,
									bottomSubtext: Formatting.formatNumFollowers(
										result.spotifyFollowersSum
									)
								}}
								radioButtonProps={{
									active: selectedItems.some((item) => item.uid === result.uid),
									onPress: () => onPressSearchedTag(result)
								}}
								onPress={() => onPressSearchResult(result)}
							/>
						))}
					</LView>
				</Else>
			</If>
		</Animated.ScrollView>
	);
};

export default TagsSearchActivePage;
