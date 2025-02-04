import { View } from '@atomic';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { useImage } from '@hooks';
import React from 'react';
import {
	LayoutRectangle,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet
} from 'react-native';
import Animated from 'react-native-reanimated';

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
	const { urlForKey } = useImage();

	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const totalHeight = event.nativeEvent.layoutMeasurement.height;
		const yPosition = event.nativeEvent.contentOffset.y;
		const newIndex = Math.round(yPosition / totalHeight);
		if (newIndex !== currentIndex) {
			setCurrentIndex(newIndex);
		}
	};

	return (
		<Animated.FlatList
			data={items}
			keyExtractor={(item) => item.index.toString()}
			pagingEnabled
			showsVerticalScrollIndicator={false}
			decelerationRate='fast'
			snapToAlignment='start'
			renderItem={({ item }) => (
				<View
					style={{
						width: dimensions.width,
						height: dimensions.height
					}}
				>
					<Animated.Image
						resizeMode='cover'
						source={{
							uri: urlForKey(item.eventMedia.multimedia.image?.original.key)
						}}
						style={{ flex: 1 }}
					/>
				</View>
			)}
			style={styles.flatlist}
			onScroll={onScroll}
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
