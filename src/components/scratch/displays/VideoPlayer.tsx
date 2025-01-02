import { AView, View } from '@atomic';
import { Button } from '@molecules';
import React, { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Video, { SelectedTrackType, VideoRef } from 'react-native-video';

const VideoPlayerWithDefaults = () => {
	return (
		<Video
			/**
			 * The source of the video which should be a uri or a valid ReactVideoSource object
			 * @type {ReactVideoSource}
			 * @description Specifies the source of the video to be played
			 * @example { uri: 'https://dev-images.alysium.ninja/3195394-uhd_3840_2160_25fps.m3u8' }
			 */
			source={{
				uri: 'https://dev-images.alysium.ninja/3195394-uhd_3840_2160_25fps.m3u8'
			}}
			/**
			 * The style of the video component
			 * @type {StyleProp<ViewStyle>}
			 * @description Applies custom styles to the video component
			 * @example { width: 300, height: 200 }
			 */
			style={styles.video}
			/**
			 * Determines if the video controls should be visible
			 * @type {boolean}
			 * @description When true, displays the default video controls
			 * @example true
			 */
			controls={true}
			/**
			 * Specifies how the video should be resized to fit its container
			 * @type {EnumValues<VideoResizeMode>}
			 * @description Options are 'contain', 'cover', 'stretch'
			 * @example "contain"
			 */
			resizeMode='contain'
			/**
			 * Determines if the video should play automatically
			 * @type {boolean}
			 * @description When false, the video will not start playing automatically
			 * @example false
			 */
			paused={false}
			/**
			 * Sets the playback rate of the video
			 * @type {number}
			 * @description 1 is normal speed, 0.5 is half speed, 2 is double speed, etc.
			 * @example 1
			 */
			rate={1}
			/**
			 * Determines if the video should repeat after ending
			 * @type {boolean}
			 * @description When true, the video will loop
			 * @example false
			 */
			repeat={false}
			/**
			 * Sets the volume of the video
			 * @type {number}
			 * @description Range is 0 to 1, where 0 is muted and 1 is full volume
			 * @example 1
			 */
			volume={1}
			/**
			 * Determines if the video should be muted
			 * @type {boolean}
			 * @description When true, the video will play without sound
			 * @example false
			 */
			muted={false}
			/**
			 * Specifies the interval at which onProgress should be called
			 * @type {number}
			 * @description Time in milliseconds between onProgress callbacks
			 * @example 250
			 */
			progressUpdateInterval={250}
			/**
			 * Determines if the video should play when the app is in the background
			 * @type {boolean}
			 * @description When true, allows audio to continue playing when app is in background
			 * @example false
			 */
			playInBackground={false}
			/**
			 * Determines if the video should play when the app is inactive
			 * @type {boolean}
			 * @description When true, video continues playing when app is in inactive state
			 * @example false
			 */
			playWhenInactive={false}
			/**
			 * Specifies a custom loader component
			 * @type {ReactNode | ((arg0: ReactVideoRenderLoaderProps) => ReactNode)}
			 * @description Custom component to show while video is loading
			 * @example {() => <ActivityIndicator size="large" color="#0000ff" />}
			 */
			renderLoader={() => <ActivityIndicator />}
			/**
			 * Specifies the poster image to show before video starts playing
			 * @type {string | ReactVideoPoster}
			 * @description URL of the poster image or an object with URL and resize mode
			 * @example "https://example.com/poster.jpg"
			 */
			poster='https://example.com/poster.jpg'
			/**
			 * Determines if the video should use the device's native controls
			 * @type {boolean}
			 * @description When true, uses the platform's native video controls
			 * @example false
			 */
			// useNativeControls={false}

			/**
			 * Specifies the selected audio track
			 * @type {SelectedTrack}
			 * @description Object specifying which audio track to use
			 * @example { type: 'language', value: 'en' }
			 */
			selectedAudioTrack={{ type: SelectedTrackType.LANGUAGE, value: 'en' }}
			/**
			 * Specifies the selected text track (subtitles)
			 * @type {SelectedTrack}
			 * @description Object specifying which text track (subtitles) to use
			 * @example { type: 'language', value: 'en' }
			 */
			selectedTextTrack={{ type: SelectedTrackType.LANGUAGE, value: 'en' }}
			/**
			 * Determines if the video should prevent the device from sleeping
			 * @type {boolean}
			 * @description When true, keeps the device awake while video is playing
			 * @example true
			 */
			preventsDisplaySleepDuringVideoPlayback={true}
		/>
	);
};

const VideoPlayer = () => {
	const hlsVideo =
		'https://dev-images.alysium.ninja/artist/BhBmP0sWGiO582CBQQmZoCN8/aPrpFC1sZ4ePUk5BfXWqURvr/index.m3u8';

	console.log(hlsVideo);
	const [paused, setPaused] = useState(false);
	const videoRef = useRef<VideoRef>(null);
	const progress = useSharedValue(0);

	const onPress = async () => {
		try {
			console.log('onPress');
			setPaused(!paused);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// Log the progress of the video as a percentage
		console.log('progress', progress);
	}, [progress]);

	const animatedWidth = useAnimatedStyle(() => {
		return {
			width: `${progress.value}%`
		};
	}, [progress]);

	return (
		<View>
			<Video
				ref={videoRef}
				source={{ uri: hlsVideo }}
				style={styles.video}
				controls={false}
				paused={paused}
				repeat
				resizeMode='cover'
				progressUpdateInterval={25}
				onProgress={(data) => {
					const { currentTime, playableDuration } = data;
					progress.value = Math.round((currentTime / playableDuration) * 100);
				}}
				renderLoader={() => <ActivityIndicator />}
			/>
			<AView
				style={[
					animatedWidth,
					{
						height: 5,
						backgroundColor: 'black'
					}
				]}
			/>
			<View margin='m'>
				<Button text='Press Me' onPress={onPress} />
				<TouchableWithoutFeedback
					onPressIn={() => videoRef.current?.pause()}
					onPressOut={() => videoRef.current?.resume()}
				>
					<View>
						<Button text='Pause' />
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	video: {
		width: '100%',
		height: 500
	}
});

export default VideoPlayer;
