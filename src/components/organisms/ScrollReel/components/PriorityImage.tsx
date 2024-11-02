import { View } from '@atomic';
import { Image } from '@flux/api/media';
import { usePriorityImage } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

interface PriorityImageProps {
	index: number;
	image?: Image | null;
	currentIndex: number;
	transitionTagId: string;
}

const PriorityImage: React.FC<PriorityImageProps> = ({
	index,
	image,
	currentIndex,
	transitionTagId
}) => {
	const { currentUrl } = usePriorityImage(image);

	return (
		<View flex={1} style={StyleSheet.absoluteFillObject}>
			<Animated.Image
				resizeMode='cover'
				source={{
					uri: currentUrl
				}}
				style={{
					width: '100%',
					height: '100%',
					...StyleSheet.absoluteFillObject
				}}
				sharedTransitionTag={
					index === currentIndex ? transitionTagId : undefined
				}
			/>
		</View>
	);
};

export default PriorityImage;
