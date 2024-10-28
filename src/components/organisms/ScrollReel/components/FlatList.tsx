import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
	ListRenderItemInfo,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet
} from 'react-native';
import Animated from 'react-native-reanimated';
import FlatListItem from './FlatListItem';

type FlatListItemProps = React.ComponentProps<typeof FlatListItem>;

interface FlatListProps {
	items: FlatListItemProps[];
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
	rewindCurrentVideo: () => void;
	playCurrentVideo: () => void;
	pauseCurrentVideo: () => void;
}

const FlatList: React.FC<FlatListProps> = ({
	items,
	currentIndex,
	setCurrentIndex,
	rewindCurrentVideo,
	playCurrentVideo,
	pauseCurrentVideo
}) => {
	// see `./scrollViewWasDragged.md` to see explanation for this
	const scrollViewWasDragged = useRef<boolean>(false);

	const FlatListItemMemo = useMemo(() => FlatListItem, []);

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<FlatListItemProps>) => {
			return <FlatListItemMemo {...item} />;
		},
		[]
	);

	const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const totalHeight = event.nativeEvent.layoutMeasurement.height;
		const yPosition = event.nativeEvent.contentOffset.y;
		const newIndex = Math.round(yPosition / totalHeight);
		if (newIndex !== currentIndex) {
			setCurrentIndex(newIndex);
		}
	};

	const onScrollBeginDrag = () => {
		scrollViewWasDragged.current = true;
		pauseCurrentVideo();
	};

	const onMomentumScrollEnd = () => {
		if (scrollViewWasDragged.current === true) {
			scrollViewWasDragged.current = false;
			playCurrentVideo();
		}
	};

	useEffect(() => {
		rewindCurrentVideo();
		playCurrentVideo();
	}, [currentIndex]);

	return (
		<Animated.FlatList
			data={items}
			keyExtractor={(item) => item.index.toString()}
			pagingEnabled
			showsVerticalScrollIndicator={false}
			decelerationRate='fast'
			snapToAlignment='start'
			renderItem={renderItem}
			style={styles.flatlist}
			onScroll={onScroll}
			onScrollBeginDrag={onScrollBeginDrag}
			onMomentumScrollEnd={onMomentumScrollEnd}
			initialNumToRender={1}
			maxToRenderPerBatch={2}
		/>
	);
};

const styles = StyleSheet.create({
	flatlist: {
		overflow: 'visible'
	}
});

export default FlatList;
