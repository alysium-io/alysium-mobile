import { View } from '@atomic';
import { GalleryItem } from '@flux/api/gallery/gallery-item.entity';
import React from 'react';
import ControlsOverlay from './ControlsOverlay';
import FlatList from './FlatList';

interface ReelsProps {
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
	transitionTagId: string;
	data?: GalleryItem[];
}

const Reels: React.FC<ReelsProps> = ({
	currentIndex,
	setCurrentIndex,
	transitionTagId,
	data
}) => {
	return (
		<View flex={1}>
			{data && (
				<FlatList
					items={data.map((item, index) => ({
						multimedia: item.multimedia,
						index,
						currentIndex,
						setCurrentIndex,
						transitionTagId
					}))}
					currentIndex={currentIndex}
					setCurrentIndex={setCurrentIndex}
				/>
			)}
			<ControlsOverlay />
		</View>
	);
};

export default Reels;
