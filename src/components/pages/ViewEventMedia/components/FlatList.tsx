import { MediaLayover, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { useNavigation } from '@hooks';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
	LayoutRectangle,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
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
	event: EventLink;
}

const FlatList: React.FC<FlatListProps> = ({
	items,
	currentIndex,
	setCurrentIndex,
	initialIndex,
	dimensions,
	event
}) => {
	const { eventPage } = useNavigation();
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
		<View>
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
					width: dimensions.width,
					offset: dimensions.height * index,
					index
				})}
			/>
			{event.event.start_time && event.event?.location && (
				<Pressable
					onPress={() =>
						eventPage(event.event.event_uid, {
							from: 'ViewEventMediaPage',
							from_uid: event.event.event_uid,
							to: 'EventPage',
							to_uid: event.event.event_uid,
							using: 'VIEW_EVENT_MEDIA_PAGE_EVENT_CONTENT_LIST_ITEM'
						})
					}
				>
					<MediaLayover
						style={{
							left: 0,
							bottom: 0,
							maxWidth: '65%'
						}}
					>
						<Text color='white' variant='paragraph-small'>
							{dayjs(event.event.start_time).format('ddd MMM. M')}
						</Text>
						<Text color='white' variant='paragraph-small' numberOfLines={1}>
							{event.event.location.name}
						</Text>
					</MediaLayover>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	flatlist: {
		overflow: 'visible'
	}
});

export default FlatList;
