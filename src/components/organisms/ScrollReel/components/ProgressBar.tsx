import { AView, View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface ProgressBarProps {
	progress: SharedValue<number>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: 3,
			width: `${progress.value}%`
		};
	}, []);

	return (
		<View style={styles.container}>
			<AView style={[animatedStyle, styles.progressBar]} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		backgroundColor: '#333'
	},
	progressBar: {
		height: '100%',
		backgroundColor: 'white'
	}
});

export default ProgressBar;
