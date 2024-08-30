import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ActiveTrackState, SliderSettings } from './settings';

type StepMarkersProps = {
	sliderSettings: SliderSettings;
	activeTrackState: ActiveTrackState;
};

const StepMarkers: React.FC<StepMarkersProps> = ({
	sliderSettings,
	activeTrackState
}) => {
	return sliderSettings.stepValues?.map((value, index) => (
		<View
			key={index}
			style={[
				styles.container,
				{
					height: sliderSettings.markerSize,
					width: sliderSettings.markerSize,
					left:
						value +
						sliderSettings.thumbSize / 2 -
						sliderSettings.markerSize / 2,
					top:
						sliderSettings.containerHeight / 2 - sliderSettings.markerSize / 2,
					backgroundColor:
						value >= activeTrackState.minValue &&
						value <= activeTrackState.maxValue
							? sliderSettings.activeMarkerColor
							: sliderSettings.inactiveMarkerColor
				}
			]}
		/>
	));
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		transform: [{ rotate: '45deg' }],
		zIndex: 2
	}
});

export default StepMarkers;
