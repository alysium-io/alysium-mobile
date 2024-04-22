import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import settings from '../settings';

interface ConnectionContainerProps {
	children: React.ReactNode;
}

const ConnectionContainer: React.FC<ConnectionContainerProps> = ({
	children
}) => {
	return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
	container: {
		width: settings.MARKER_SIZE,
		height: '100%',
		position: 'relative'
	}
});

export default ConnectionContainer;
