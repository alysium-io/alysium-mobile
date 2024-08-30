import { useLayoutDimensions } from '@hooks';
import React, { useMemo } from 'react';
import { runOnJS } from 'react-native-reanimated';
import {
	defaultSliderSettings,
	generateSteps,
	SlideEvent,
	SliderSettings,
	ThumbType
} from './settings';
import SliderContainer from './SliderContainer';
import Thumb from './Thumb';
import useActiveTrackState from './useActiveTrackState';

type SliderProps = {
	settings?: Partial<SliderSettings>;
	onChange?: (event: SlideEvent) => void;
	defaultIndex?: number;
};

const Slider: React.FC<SliderProps> = ({
	onChange,
	settings,
	defaultIndex
}) => {
	const { dimensions, onLayout } = useLayoutDimensions();
	const { activeTrackState, setMax } = useActiveTrackState();

	const _settings = useMemo(() => {
		const calculatedTrackWidth =
			dimensions.width - defaultSliderSettings.thumbSize;
		const steps = settings?.steps
			? generateSteps(0, calculatedTrackWidth, settings.steps)
			: null;
		return {
			...defaultSliderSettings,

			...settings,

			trackWidth: calculatedTrackWidth,
			containerHeight: dimensions.height,
			containerWidth: dimensions.width,

			stepValues: settings && settings.steps ? steps : null,

			defaultMaxPosition: steps ? steps[defaultIndex ?? steps.length - 1] : -1,

			loaded: dimensions.width > 0
		};
	}, [dimensions, settings]);

	const _onChange = (event: SlideEvent) => {
		'worklet';
		if (onChange) {
			runOnJS(onChange)(event);
		}

		runOnJS(setMax)(event.thumbState.value);
	};

	if (!_settings.loaded) {
		return (
			<SliderContainer
				sliderSettings={_settings}
				activeTrackState={activeTrackState}
				onLayout={onLayout}
			/>
		);
	}

	return (
		<SliderContainer
			sliderSettings={_settings}
			activeTrackState={activeTrackState}
			onLayout={onLayout}
		>
			<Thumb
				defaultPosition={_settings.defaultMaxPosition}
				onChange={_onChange}
				sliderSettings={_settings}
				thumbType={ThumbType.MAX}
				activeTrackState={activeTrackState}
			/>
		</SliderContainer>
	);
};

export default Slider;
