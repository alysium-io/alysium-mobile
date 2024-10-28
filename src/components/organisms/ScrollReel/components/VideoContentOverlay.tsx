import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import ProgressBar from './ProgressBar';

interface VideoContentOverlayProps {
	progress: SharedValue<number>;
}

const VideoContentOverlay: React.FC<VideoContentOverlayProps> = ({
	progress
}) => {
	return (
		<View style={StyleSheet.absoluteFillObject}>
			<ProgressBar progress={progress} />
		</View>
	);
};

export default VideoContentOverlay;
