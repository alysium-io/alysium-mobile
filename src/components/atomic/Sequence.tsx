import { View } from '@atomic';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import {
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
		value.value = withTiming(sequenceIndex);
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

interface SequenceProps {
	children: React.ReactNode[];
	sequenceIndex: number;
}

const Sequence: React.FC<SequenceProps> = ({ children, sequenceIndex }) => (
	<View style={styles.sequence}>
		{children?.map((child: React.ReactNode, index: number) => {
			return (
				<SequenceItem sequenceIndex={sequenceIndex} index={index} key={index}>
					{child}
				</SequenceItem>
			);
		})}
	</View>
);

export interface SequenceApi {
	next: () => void;
	back: () => void;
	reset: () => void;
	sequenceIndex: number;
}

export const useSequence = (numItems: number): SequenceApi => {
	const [sequenceIndex, setSequenceIndex] = useState<number>(0);
	const next = () => setSequenceIndex(Math.min(numItems, sequenceIndex + 1));
	const back = () => setSequenceIndex(Math.max(0, sequenceIndex - 1));
	const reset = () => setSequenceIndex(0);
	return {
		next,
		back,
		reset,
		sequenceIndex
	};
};

const styles = StyleSheet.create({
	sequence: {
		flex: 1,
		flexDirection: 'row'
	},
	sequenceItem: {
		position: 'absolute',
		width: '100%',
		height: '100%'
	}
});

export default Sequence;
