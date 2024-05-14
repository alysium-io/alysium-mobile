import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import settings, { ContainerType } from '../settings';

const markerShapeScheme = {
	event: 0,
	artist: 100
};

interface MarkerProps {
	containerType: ContainerType;
}

const Marker: React.FC<MarkerProps> = ({ containerType }) => {
	return (
		<View
			style={[
				styles.container,
				{
					borderRadius: markerShapeScheme[containerType],
					top:
						settings.containerHeightScheme[containerType] / 2 -
						settings.MARKER_SIZE / 2
				}
			]}
			backgroundColor='t2'
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		width: settings.MARKER_SIZE,
		aspectRatio: 1,
		transform: [{ rotate: '45deg' }],
		position: 'absolute',
		top: settings.CONTAINER_EVENT_HEIGHT / 2 - settings.MARKER_SIZE / 2
	}
});

export default Marker;
