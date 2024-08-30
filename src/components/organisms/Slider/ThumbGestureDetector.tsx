import { Props } from '@types';
import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { clamp, SharedValue } from 'react-native-reanimated';
import {
	ActiveTrackState,
	SlideEvent,
	SliderSettings,
	ThumbType
} from './settings';

type ThumbGestureDetectorProps = Omit<
	Props<typeof GestureDetector>,
	'gesture'
> & {
	translationX: SharedValue<number>;
	prevTranslationX: SharedValue<number>;
	maxThumbDistance: SharedValue<number>;
	sliderSettings: SliderSettings;
	onChange?: (event: SlideEvent) => void;
	thumbType: ThumbType;
	activeTrackState: ActiveTrackState;
};

const ThumbGestureDetector: React.FC<ThumbGestureDetectorProps> = ({
	translationX,
	prevTranslationX,
	maxThumbDistance,
	sliderSettings,
	onChange,
	thumbType,
	activeTrackState,
	...props
}) => {
	const findNearestStep = (value: number, steps: number[]): number => {
		'worklet';
		return steps.reduce((prev, curr) =>
			Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
		);
	};

	const pan = Gesture.Pan()
		.minDistance(1)
		.onStart(() => {
			prevTranslationX.value = translationX.value;
		})
		.onUpdate((event) => {
			const currentValue = translationX.value;

			const currentThumbPosition = clamp(
				prevTranslationX.value + event.translationX,
				0,
				maxThumbDistance.value
			);

			if (sliderSettings.stepValues !== null) {
				// If we are using steps
				const nearestStepValue = findNearestStep(
					currentThumbPosition,
					sliderSettings.stepValues
				);

				if (currentValue !== nearestStepValue) {
					translationX.value = nearestStepValue;
					if (onChange) {
						const stepIndex =
							sliderSettings.stepValues.indexOf(nearestStepValue);
						const stepValue = sliderSettings.stepValues[stepIndex];
						onChange({
							thumbState: {
								previousValue: currentValue,
								value: nearestStepValue,
								stepIndex,
								stepValue,
								thumbType
							},
							sliderSettings,
							stepActivityMapState:
								sliderSettings.stepValues !== null
									? sliderSettings.stepValues.map((value, index) => {
											const minVal =
												thumbType === ThumbType.MIN
													? stepValue
													: activeTrackState.minValue;
											const maxVal =
												thumbType === ThumbType.MAX
													? stepValue
													: activeTrackState.maxValue;

											const leftIsActive = sliderSettings.leftInclusive
												? value >= minVal
												: value > minVal;
											const rightIsActive = sliderSettings.rightInclusive
												? value <= maxVal
												: value < maxVal;

											return {
												stepIndex: index,
												stepValue: value,
												isActive: leftIsActive && rightIsActive
											};
									  })
									: null
						});
					}
				}
			} else {
				// If we are not using steps
				translationX.value = currentThumbPosition;
				if (onChange) {
					onChange({
						thumbState: {
							previousValue: currentValue,
							value: currentThumbPosition,
							stepIndex: -1,
							stepValue: -1,
							thumbType
						},
						sliderSettings,
						stepActivityMapState: null
					});
				}
			}
		});

	return <GestureDetector gesture={pan} {...props} />;
};

export default ThumbGestureDetector;
