import { View } from '@atomic';
import { Props } from '@types';
import React, { useEffect } from 'react';
import Animated, {
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated';
import {
	ActiveTrackState,
	SlideEvent,
	SliderSettings,
	ThumbType
} from './settings';
import ThumbGestureDetector from './ThumbGestureDetector';

type ThumbProps = Props<typeof View> & {
	sliderSettings: SliderSettings;
	onChange?: (event: SlideEvent) => void;
	defaultPosition?: number;
	thumbType: ThumbType;
	activeTrackState: ActiveTrackState;
};

const Thumb: React.FC<ThumbProps> = ({
	onChange,
	sliderSettings,
	defaultPosition = 0,
	thumbType,
	activeTrackState,
	...props
}) => {
	const translationX = useSharedValue(defaultPosition);
	const prevTranslationX = useSharedValue(0);
	const maxThumbDistance = useSharedValue(sliderSettings.trackWidth);

	useEffect(() => {
		maxThumbDistance.value = sliderSettings.trackWidth;
	}, [sliderSettings.trackWidth]);

	const animatedStyles = useAnimatedStyle(
		() => ({
			transform: [{ translateX: translationX.value }]
		}),
		[]
	);

	return (
		<ThumbGestureDetector
			translationX={translationX}
			prevTranslationX={prevTranslationX}
			maxThumbDistance={maxThumbDistance}
			sliderSettings={sliderSettings}
			onChange={onChange}
			thumbType={thumbType}
			activeTrackState={activeTrackState}
		>
			<Animated.View
				height={sliderSettings.thumbSize}
				width={sliderSettings.thumbSize}
				{...props}
				style={[
					animatedStyles,
					{
						position: 'absolute',
						borderWidth: sliderSettings.thumbBorderWidth,
						borderColor: sliderSettings.thumbBorderColor,
						backgroundColor: sliderSettings.thumbBackgroundColor,
						borderRadius: sliderSettings.thumbBorderRadius,
						zIndex: 2
					}
				]}
			/>
		</ThumbGestureDetector>
	);
};

export default Thumb;
