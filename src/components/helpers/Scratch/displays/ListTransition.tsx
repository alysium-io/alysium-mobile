import { Text } from '@atomic';
import { ListItemWithRadio } from '@molecules';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeOut, LinearTransition } from 'react-native-reanimated';

const INITIAL_LIST = [
	{ id: 1, emoji: '🍌', color: '#b58df1' },
	{ id: 2, emoji: '🍎', color: '#ffe780' },
	{ id: 3, emoji: '🥛', color: '#fa7f7c' },
	{ id: 4, emoji: '🍙', color: '#82cab2' },
	{ id: 5, emoji: '🍇', color: '#fa7f7c' },
	{ id: 6, emoji: '🍕', color: '#b58df1' },
	{ id: 7, emoji: '🍔', color: '#ffe780' },
	{ id: 8, emoji: '🍟', color: '#b58df1' },
	{ id: 9, emoji: '🍩', color: '#82cab2' }
];

type Item = { id: number; emoji: string; color: string };

const Candies = () => {
	const [items, setItems] = useState(INITIAL_LIST);

	const moveItem = (id: number) => {
		const updatedItems = items.filter((item) => item.id === id);
		setItems(updatedItems.concat(items.filter((item) => item.id !== id)));
	};

	return (
		<View style={styles.gridContainer}>
			{items.map((item: Item) => (
				<Animated.View
					key={item.id}
					layout={LinearTransition}
					exiting={FadeOut}
					style={[styles.tileContainer, { backgroundColor: item.color }]}
				>
					<TouchableOpacity
						onPress={() => moveItem(item.id)}
						style={styles.tile}
					>
						<Text style={styles.tileLabel}>{item.emoji}</Text>
					</TouchableOpacity>
				</Animated.View>
			))}
		</View>
	);
};

type SetItem = {
	id: string;
	title: string;
	subtext: string;
};

const ListItems = () => {
	const [setItems, setSetItems] = useState([
		{
			id: '1',
			title: 'Title 1',
			subtext: 'Subtext 1'
		},
		{
			id: '2',
			title: 'Title 2',
			subtext: 'Subtext 2'
		},
		{
			id: '3',
			title: 'Title 3',
			subtext: 'Subtext 3'
		},
		{
			id: '4',
			title: 'Title 4',
			subtext: 'Subtext 4'
		},
		{
			id: '5',
			title: 'Title 5',
			subtext: 'Subtext 5'
		}
	]);

	const [selectedItems, setSelectedItems] = useState<SetItem[]>([]);

	const moveItem = (id: string) => {
		const currentlyActive = selectedItems.some((item) => item.id === id);
		if (currentlyActive) {
			// Add to set items
			setSetItems([
				selectedItems.find((item) => item.id === id) as SetItem,
				...setItems
			]);

			// Remove from selected items
			const updatedItems = selectedItems.filter((item) => item.id !== id);
			setSelectedItems(updatedItems);
		} else {
			// Add to selected items
			setSelectedItems([
				...selectedItems,
				setItems.find((item) => item.id === id) as SetItem
			]);

			// Remove from set items
			const updatedItems = setItems.filter((item) => item.id !== id);
			setSetItems(updatedItems);
		}
	};

	return (
		<View>
			{[...selectedItems, ...setItems].map((item, index) => (
				<Animated.View key={item.id} layout={LinearTransition}>
					<ListItemWithRadio
						id={item.id}
						onPress={() => console.log('Pressed')}
						titleTextProps={{
							title: item.title,
							bottomSubtext: item.subtext
						}}
						radioButtonProps={{
							active: selectedItems.some((i) => i.id === item.id),
							onPress: () => {
								console.log('Toggle');
								moveItem(item.id);
							}
						}}
					/>
				</Animated.View>
			))}
		</View>
	);
};

const ListTransition = () => {
	return (
		<Animated.ScrollView>
			<ListItems />
			<Candies />
		</Animated.ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
		width: 'auto',
		display: 'flex',
		minHeight: 300
	},
	gridContainer: {
		marginTop: 25,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingHorizontal: 32
	},
	tileContainer: {
		width: '20%',
		margin: '1%',
		borderRadius: 16,
		minHeight: 80,
		justifyContent: 'center',
		alignItems: 'center'
	},
	tile: {
		flex: 1,
		height: '100%',
		width: ' 100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	tileLabel: {
		color: '#f8f9ff',
		fontSize: 24
	}
});

export default ListTransition;
