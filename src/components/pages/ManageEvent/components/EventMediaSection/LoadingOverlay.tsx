import { View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import LoaderKit from 'react-native-loader-kit';

const LoadingOverlay = () => {
	const { theme } = useTheme();
	return (
		<View
			style={[
				StyleSheet.absoluteFill,
				{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }
			]}
			justifyContent='center'
			alignItems='center'
		>
			<LoaderKit
				style={{ width: 40, height: 40 }}
				name='CircleStrokeSpin'
				color={theme.colors['etc.loader-kit']}
			/>
		</View>
	);
};

export default LoadingOverlay;
