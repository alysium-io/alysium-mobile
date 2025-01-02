import { Image, View } from '@atomic';
import React, { useRef, useState } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	useWindowDimensions
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface ImageItem {
	uri?: string;
}

interface FeedListItemMediaCarouselProps {
	images: ImageItem[];
	onPress?: () => void;
}

const FeedListItemMediaCarousel: React.FC<FeedListItemMediaCarouselProps> = ({
	images,
	onPress
}) => {
	const { height, width } = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef<FlatList<ImageItem>>(null);

	const renderItem = ({ item }: { item: ImageItem }) => (
		<TouchableWithoutFeedback onPress={onPress}>
			<View height={height * 0.5} width={width}>
				<Image
					style={{ height: '100%', width: '100%' }}
					source={{ uri: item.uri }}
				/>
			</View>
		</TouchableWithoutFeedback>
	);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const contentOffset = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffset / width);
		setCurrentIndex(index);
	};

	const getItemLayout = (
		_: ArrayLike<ImageItem> | null | undefined,
		index: number
	) => ({
		length: width,
		offset: width * index,
		index
	});

	return (
		<View>
			<FlatList
				ref={flatListRef}
				data={images}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				getItemLayout={getItemLayout}
				initialNumToRender={1}
				maxToRenderPerBatch={2}
				windowSize={3}
				keyExtractor={(_: ImageItem, index: number) => index.toString()}
				alwaysBounceHorizontal={false}
			/>

			{images.length > 1 && (
				<View
					flexDirection='row'
					justifyContent='center'
					alignItems='center'
					marginTop='s'
				>
					{images.map((_, index) => (
						<View
							key={index}
							height={5}
							width={5}
							borderRadius='round'
							margin='xs'
							backgroundColor={currentIndex === index ? 'text.p' : 'text.q'}
							opacity={currentIndex === index ? 1 : 0.5}
						/>
					))}
				</View>
			)}
		</View>
	);
};

export default FeedListItemMediaCarousel;
