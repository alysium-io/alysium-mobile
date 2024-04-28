import { generateId } from '@etc';
import React, { useState } from 'react';
import { SimpleGrid } from 'react-native-super-grid';
import LargeSelectableItem from './LargeSelectableItem';
import { LargeSelectableItemData } from './shared';

interface LargeSelectableItemRadioListProps {
	data: LargeSelectableItemData[];
	defaultId: any;
	onPress?: (id: any) => void;
}

const LargeSelectableItemRadioList: React.FC<
	LargeSelectableItemRadioListProps
> = ({ data, defaultId, onPress }) => {
	const [selected, setSelected] = useState<any>(defaultId);

	const _onPress = (id: any) => {
		setSelected(id);
		onPress && onPress(id);
	};

	return (
		<SimpleGrid
			listKey={generateId()}
			spacing={10}
			maxItemsPerRow={2}
			data={data}
			renderItem={({ item }) => (
				<LargeSelectableItem
					key={item.id}
					text={item.title}
					icon={item.icon}
					selected={selected === item.id}
					onPress={() => _onPress(item.id)}
				/>
			)}
		/>
	);
};

export default LargeSelectableItemRadioList;
