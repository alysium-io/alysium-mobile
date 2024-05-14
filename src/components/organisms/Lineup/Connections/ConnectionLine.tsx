import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import settings, { ContainerType } from '../settings';

interface ConnectionLineProps {
	currentContainerType: ContainerType;
	nextContainerType: ContainerType | null;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
	currentContainerType,
	nextContainerType
}) => {
	// If there is no next container type, return null
	if (nextContainerType === null) return null;

	return (
		<View
			style={[
				styles.container,
				{
					height: settings.calculateLineHeight(
						currentContainerType,
						nextContainerType
					),
					top: settings.containerHeightScheme[currentContainerType] / 2
				}
			]}
			backgroundColor='t2'
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: settings.CONNECTION_LINE_WIDTH,
		left: settings.MARKER_SIZE / 2 - settings.CONNECTION_LINE_WIDTH / 2
	}
});

export default ConnectionLine;
