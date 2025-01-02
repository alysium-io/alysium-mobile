import { Props } from '@types';
import React, { useCallback } from 'react';
import {
	ListRenderItemInfo,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet
} from 'react-native';
import Animated from 'react-native-reanimated';
import FlatListItem from './FlatListItem';

type FlatListItemProps = Props<typeof FlatListItem>;

interface FlatListProps {
	items: FlatListItemProps[];
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
}

const FlatList: React.FC<FlatListProps> = ({
	items,
	currentIndex,
	setCurrentIndex
}) => {
	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<FlatListItemProps>) => {
			return <FlatListItem {...item} />;
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
