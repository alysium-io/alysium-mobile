import { View } from '@atomic';
import { Multimedia } from '@flux/api/media';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import PriorityImage from './PriorityImage';

interface FlatListItemProps {
	index: number;
	multimedia: Multimedia;
	currentIndex: number;
	transitionTagId: string;
}

const FlatListItem: React.FC<FlatListItemProps> = ({
	index,
	multimedia,
	currentIndex,
	transitionTagId
}) => {
	const { width, height } = useWindowDimensions();

	return (
		<View
			style={{
				width,
				height
			}}
		>
			<PriorityImage
				index={index}
				image={multimedia.image}
				currentIndex={currentIndex}
				transitionTagId={transitionTagId}
			/>
		</View>
	);
};

export default FlatListItem;
