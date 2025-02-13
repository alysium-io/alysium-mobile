import { EventMedia } from '@flux/api/event-media/event-media.entity';
import React, { useState } from 'react';
import {
	LayoutRectangle,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet
} from 'react-native';
import Animated from 'react-native-reanimated';
import FlatListItem from './FlatListItem';

interface FlatListItemProps {
	eventMedia: EventMedia;
	index: number;
}

interface FlatListProps {
	items: FlatListItemProps[];
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
	initialIndex: number;
	dimensions: LayoutRectangle;
}

const FlatList: React.FC<FlatListProps> = ({
	items,
	currentIndex,
	setCurrentIndex,
	initialIndex,
	dimensions
}) => {
	const [isInteracting, setIsInteracting] = useState(false);

	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const totalHeight = event.nativeEvent.layoutMeasurement.height;
		const yPosition = event.nativeEvent.contentOffset.y;
		const newIndex = Math.round(yPosition / totalHeight);
		if (newIndex !== currentIndex) {
			setCurrentIndex(newIndex);
		}
	};

	const onScrollBeginDrag = () => {
		setIsInteracting(true);
	};

	const onScrollEndDrag = () => {
		// Add a small delay before resuming video playback
		setTimeout(() => {
			setIsInteracting(false);
		}, 300);
	};

	const onMomentumScrollEnd = () => {
		setIsInteracting(false);
	};

	return (
		<Animated.FlatList
			data={items}
			keyExtractor={(item) => item.index.toString()}
			pagingEnabled
			showsVerticalScrollIndicator={false}
			decelerationRate='fast'
			snapToAlignment='start'
			renderItem={({ item, index }) => (
				<FlatListItem
					dimensions={dimensions}
					item={item.eventMedia}
					isVisible={index === currentIndex}
					isInteracting={isInteracting}
					currentIndex={currentIndex}
					index={index}
				/>
			)}
			style={styles.flatlist}
			onScroll={onScroll}
			onScrollBeginDrag={onScrollBeginDrag}
			onScrollEndDrag={onScrollEndDrag}
			onMomentumScrollEnd={onMomentumScrollEnd}
			initialNumToRender={1}
			maxToRenderPerBatch={2}
			initialScrollIndex={initialIndex}
			getItemLayout={(data, index) => ({
				length: dimensions.height,
				offset: dimensions.height * index,
				index
			})}
		/>
	);
};

const styles = StyleSheet.create({
	flatlist: {
		overflow: 'visible'
	}
});

export default FlatList;
