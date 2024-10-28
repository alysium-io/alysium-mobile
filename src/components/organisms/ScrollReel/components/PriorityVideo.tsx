import { View } from '@atomic';
import { Video } from '@flux/api/media';
import { useImage } from '@hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import RNVideo, {
	OnLoadData,
	OnProgressData,
	VideoRef
} from 'react-native-video';
import { VideoControlApi } from '../useVideoControl';
import LoadingOverlay from './LoadingOverlay';
import PriorityImage from './PriorityImage';
import VideoContentOverlay from './VideoContentOverlay';

interface PriorityVideoProps {
	index: number;
	video?: Video | null;
	videoControl: VideoControlApi;
	toggleCurrentVideoPlay: () => void;
	onLoadConfigVideo: (onLoadData: OnLoadData) => void;
	currentIndex: number;
	transitionTagId: string;
}

const PriorityVideo: React.FC<PriorityVideoProps> = ({
	video,
	index,
	videoControl,
	toggleCurrentVideoPlay,
	onLoadConfigVideo,
	currentIndex,
	transitionTagId
}) => {
	const { urlForKey } = useImage();
	const videoRef = useRef<VideoRef>(null);
	const progress = useSharedValue(0);

	useEffect(() => {
		videoControl.register(index, videoRef.current);
		return () => {
			videoControl.unregister(index);
		};
	}, []);

	const onProgress = useCallback((data: OnProgressData) => {
		progress.value = Math.round(
			(data.currentTime / data.playableDuration) * 100
		);
	}, []);

	return (
		<View flex={1}>
			<PriorityImage
				index={index}
				image={video?.thumbnail}
				currentIndex={currentIndex}
				transitionTagId={transitionTagId}
			/>
			<TouchableWithoutFeedback
				style={{ flex: 1 }}
				containerStyle={{ flex: 1 }}
				onPress={toggleCurrentVideoPlay}
			>
				<RNVideo
					ref={videoRef}
					source={{ uri: urlForKey(video?.media.key) }}
					resizeMode='cover'
					controls={false}
					onLoad={onLoadConfigVideo}
					paused={index === 0 ? false : true}
					onProgress={onProgress}
					renderLoader={LoadingOverlay}
					progressUpdateInterval={25}
					style={styles.video}
					repeat
				/>
				<VideoContentOverlay progress={progress} />
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	video: {
		height: '100%',
		width: '100%'
	}
});

export default PriorityVideo;
