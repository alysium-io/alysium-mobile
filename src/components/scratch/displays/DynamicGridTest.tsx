import { DynamicGrid, Text, View } from '@atomic';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MyItem {
	id: number;
	title: string;
}

const DynamicGridTest = () => {
	const insets = useSafeAreaInsets();

	// Test cases with different numbers of items
	const testCases: { title: string; data: MyItem[] }[] = [
		{
			title: '1 Item',
			data: [{ id: 1, title: 'Single Item' }]
		},
		{
			title: '2 Items',
			data: [
				{ id: 1, title: 'Item 1' },
				{ id: 2, title: 'Item 2' }
			]
		},
		{
			title: '3 Items',
			data: [
				{ id: 1, title: 'Item 1' },
				{ id: 2, title: 'Item 2' },
				{ id: 3, title: 'Item 3' }
			]
		},
		{
			title: '4 Items',
			data: [
				{ id: 1, title: 'Item 1' },
				{ id: 2, title: 'Item 2' },
				{ id: 3, title: 'Item 3' },
				{ id: 4, title: 'Item 4' }
			]
		},
		{
			title: '5 Items',
			data: [
				{ id: 1, title: 'Item 1' },
				{ id: 2, title: 'Item 2' },
				{ id: 3, title: 'Item 3' },
				{ id: 4, title: 'Item 4' },
				{ id: 5, title: 'Item 5' }
			]
		},
		{
			title: '6 Items',
			data: [
				{ id: 1, title: 'Item 1' },
				{ id: 2, title: 'Item 2' },
				{ id: 3, title: 'Item 3' },
				{ id: 4, title: 'Item 4' },
				{ id: 5, title: 'Item 5' },
				{ id: 6, title: 'Item 6' }
			]
		},
		{
			title: '7 Items',
			data: [
				{ id: 1, title: 'Item 1' },
				{ id: 2, title: 'Item 2' },
				{ id: 3, title: 'Item 3' },
				{ id: 4, title: 'Item 4' },
				{ id: 5, title: 'Item 5' },
				{ id: 6, title: 'Item 6' },
				{ id: 7, title: 'Item 7' }
			]
		}
	];

	const renderItem = ({ item }: { item: MyItem; index: number }) => (
		<View style={styles.gridItem}>
			<Text>{item.title}</Text>
		</View>
	);

	return (
		<View style={{ marginTop: insets.top }}>
			<ScrollView>
				{testCases.map((testCase, index) => (
					<View key={`test-${index}`} style={styles.testCase} margin='m'>
						<Text style={styles.testTitle}>{testCase.title}</Text>
						<DynamicGrid data={testCase.data} renderItem={renderItem} />
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	testCase: {
		marginVertical: 20
	},
	testTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 10,
		marginLeft: 10
	},
	gridItem: {
		backgroundColor: '#e0e0e0',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	}
});

export default DynamicGridTest;
