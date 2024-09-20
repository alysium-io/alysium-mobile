import { View } from '@atomic';
import { generateId } from '@etc';
import React, { useState } from 'react';
import { SimpleGrid } from 'react-native-super-grid';
import EditableAssetImage from './EditableAssetImage';

const data = [
	{
		id: 1,
		url: undefined
	},
	{
		id: 2,
		url: undefined
	},
	{
		id: 3,
		url: undefined
	},
	{
		id: 4,
		url: undefined
	},
	{
		id: 5,
		url: undefined
	},
	{
		id: 6,
		url: undefined
	}
];

const listKey = generateId();

const EditableAssetImages = () => {
	const [state, setState] = useState<{ id: number; url?: string }[]>(data);

	const onChangeImage = (id: number, url: string) => {
		const newState = state.map((item) => {
			if (item.id === id) {
				return { ...item, url };
			}
			return item;
		});
		setState(newState);
	};

	return (
		<View padding='m'>
			<SimpleGrid
				listKey={listKey}
				itemDimension={0}
				spacing={2}
				maxItemsPerRow={3}
				itemContainerStyle={{ aspectRatio: 1 }}
				data={state}
				renderItem={({ item }) => (
					<EditableAssetImage
						key={item.id}
						id={item.id}
						image={item.url}
						onChangeImage={onChangeImage}
					/>
				)}
			/>
		</View>
	);
};

export default EditableAssetImages;
