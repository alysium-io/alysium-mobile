import { View } from '@atomic';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import {
	Easing,
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface SequenceItemProps {
	children: React.ReactNode;
	sequenceIndex: number;
	index: number;
}

const SequenceItem: React.FC<SequenceItemProps> = ({
	children,
	sequenceIndex,
	index
}) => {
	const [width, setWidth] = useState<number>(sequenceIndex);
	const value = useSharedValue<number>(sequenceIndex * width + width * index);

	useEffect(() => {
		value.value = withTiming(sequenceIndex, {
			duration: 200,
			easing: Easing.inOut(Easing.ease)
		});
	}, [sequenceIndex, width]);

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			opacity:
				width === 0
					? 0
					: interpolate(
							value.value,
							[index - 1, index, index + 1],
							[0, 1, 0],
							Extrapolation.CLAMP
						),
			transform: [{ translateX: -value.value * width + width * index }]
		};
	}, [sequenceIndex, width]);

	const onLayout = (event: LayoutChangeEvent) => {
		setWidth(event.nativeEvent.layout.width);
	};

	return (
		<View
			animated
			style={[animatedContainerStyle, styles.sequenceItem]}
			onLayout={onLayout}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	sequenceItem: {
		position: 'absolute',
		width: '100%',
		height: '100%'
	}
});

export default SequenceItem;
