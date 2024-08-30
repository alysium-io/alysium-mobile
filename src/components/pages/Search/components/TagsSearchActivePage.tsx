import { View } from '@atomic';
import { searchApiSlice } from '@flux/api/search';
import { TagSearchItem } from '@flux/api/search/search.entity';
import { useNavigation, usePagination, useSet } from '@hooks';
import { ListItemWithRadio } from '@molecules';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';

const TagsSearchActivePage = () => {
	const { tagPage } = useNavigation();
	const { page, defaultLimit } = usePagination();
	const [selectedItems, setSelectedItems] = useState<TagSearchItem[]>([]);
	const { items: filterUids, toggleItem: toggleFilterUid } = useSet<string>([]);
	const [setItems, setSetItems] = useState<TagSearchItem[]>([]);
	const { data } = searchApiSlice.useSearchTagsQuery({
		body: {
			q: '',
			correlated_tag_uids: filterUids.size ? Array.from(filterUids) : undefined,
			sort: ['spotify_followers_sum:desc']
		},
		query: {
			page: page,
			limit: defaultLimit
		}
	});

	useEffect(() => {
		if (data) {
			setSetItems(
				data.hits.filter(
					(i) => !selectedItems.some((item) => item.uid === i.uid)
				)
			);
		}
	}, [data]);

	const toggleItem = (uid: string) => {
		const itemInQuestion = selectedItems.find((item) => item.uid === uid);
		if (itemInQuestion) {
			// Add to set items
			setSetItems(
				_.orderBy(
					[...setItems, itemInQuestion],
					['spotifyFollowersSum'],
					['desc']
				)
			);

			// Remove from selected items
			const updatedItems = selectedItems.filter((item) => item.uid !== uid);
			setSelectedItems(updatedItems);
		} else {
			// Add to selected items
			const selectedItem = setItems.find((item) => item.uid === uid);
			if (selectedItem) {
				setSelectedItems([...selectedItems, selectedItem]);
			}

			// Remove from set items
			const updatedItems = setItems.filter((item) => item.uid !== uid);
			setSetItems(updatedItems);
		}
		toggleFilterUid(uid);
	};

	return (
		<Animated.ScrollView style={{ overflow: 'visible' }}>
			{[...selectedItems, ...setItems].map((i, idx) => (
				<View key={i.uid} animated layout={LinearTransition}>
					<ListItemWithRadio
						id={i.uid}
						titleTextProps={{
							title: i.name,
							bottomSubtext: `${i.spotifyFollowersSum.toLocaleString()} followers`
						}}
						radioButtonProps={{
							active: selectedItems.some((item) => item.uid === i.uid),
							onPress: () => toggleItem(i.uid)
						}}
						onPress={() => tagPage(i.uid)}
					/>
				</View>
			))}
		</Animated.ScrollView>
	);
};

export default TagsSearchActivePage;
