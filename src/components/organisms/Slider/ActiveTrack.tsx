import { Props } from '@types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActiveTrackState, SliderSettings } from './settings';

type ActiveTrackProps = Props<typeof View> & {
	activeTrackState: ActiveTrackState;
	sliderSettings: SliderSettings;
};

const ActiveTrack: React.FC<ActiveTrackProps> = ({
	activeTrackState,
	sliderSettings,
	...props
}) => {
	return (
		<View
			style={[
				styles.track,
				{
					backgroundColor: sliderSettings.activeTrackColor,
					height: sliderSettings.trackHeight,
					top:
						sliderSettings.containerHeight / 2 - sliderSettings.trackHeight / 2,
					left: sliderSettings.thumbSize / 2 + activeTrackState.minValue,
					width: activeTrackState.maxValue - activeTrackState.minValue
				}
			]}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	track: {
		position: 'absolute',
		borderRadius: 999,
		zIndex: 1
	}
});

export default ActiveTrack;
