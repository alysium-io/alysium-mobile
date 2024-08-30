import { Props } from '@types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SliderSettings } from './settings';

type TrackProps = Props<typeof View> & {
	sliderSettings: SliderSettings;
};

const Track: React.FC<TrackProps> = ({ sliderSettings, ...props }) => {
	return (
		<View
			style={[
				styles.track,
				{
					backgroundColor: sliderSettings.trackColor,
					width: sliderSettings.trackWidth,
					height: sliderSettings.trackHeight,
					top:
						sliderSettings.containerHeight / 2 - sliderSettings.trackHeight / 2,
					left: sliderSettings.thumbSize / 2
				}
			]}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	track: {
		position: 'absolute',
		borderRadius: 999
	}
});

export default Track;
