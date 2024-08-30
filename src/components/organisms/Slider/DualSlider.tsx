import { useLayoutDimensions } from '@hooks';
import React, { useEffect, useMemo } from 'react';
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

type DualSliderProps = {
	settings?: Partial<SliderSettings>;
	onChange?: (event: SlideEvent) => void;
	defaultMinIndex?: number;
	defaultMaxIndex?: number;
};

const DualSlider: React.FC<DualSliderProps> = ({
	onChange,
	settings,
	defaultMinIndex,
	defaultMaxIndex
}) => {
	const { dimensions, onLayout } = useLayoutDimensions();
	const { activeTrackState, setMin, setMax } = useActiveTrackState();

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

			stepValues: steps,

			defaultMinPosition: steps ? steps[defaultMinIndex ?? 0] : -1,
			defaultMaxPosition: steps
				? steps[defaultMaxIndex ?? steps.length - 1]
				: -1,

			loaded: dimensions.width > 0
		};
	}, [dimensions, settings]);

	useEffect(() => {
		if (_settings.loaded) {
			setMax(_settings.trackWidth);
		}
	}, [_settings.loaded]);

	const _onChangeMin = (event: SlideEvent) => {
		'worklet';
		if (onChange) {
			runOnJS(onChange)(event);
		}

		runOnJS(setMin)(event.thumbState.value);
	};

	const _onChangeMax = (event: SlideEvent) => {
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
				onChange={_onChangeMin}
				sliderSettings={_settings}
				thumbType={ThumbType.MIN}
				activeTrackState={activeTrackState}
				defaultPosition={_settings.defaultMinPosition}
			/>
			<Thumb
				onChange={_onChangeMax}
				sliderSettings={_settings}
				thumbType={ThumbType.MAX}
				activeTrackState={activeTrackState}
				defaultPosition={_settings.defaultMaxPosition}
			/>
		</SliderContainer>
	);
};

export default DualSlider;
