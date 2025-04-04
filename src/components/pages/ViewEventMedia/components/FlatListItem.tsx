import { Icon, MediaLayover, Video, View } from '@atomic';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { MediaType } from '@flux/api/media/types';
import { useImage, useTransientAppState } from '@hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Image, LayoutRectangle, Pressable } from 'react-native';
import { VideoRef } from 'react-native-video';

interface FlatListItemProps {
	item: EventMedia;
	dimensions: LayoutRectangle;
	isVisible: boolean;
	isInteracting: boolean;
	currentIndex: number;
	index: number;
}

const FlatListItem: React.FC<FlatListItemProps> = ({
	dimensions,
	item,
	isVisible,
	isInteracting,
	currentIndex,
	index
}) => {
	const { urlForKey } = useImage();
	const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
	const videoRef = useRef<VideoRef>(null);
	const { soundEnabled, toggleSoundEnabled } = useTransientAppState();

	// Update video playback state based on visibility and interaction
	useEffect(() => {
		setShouldPlayVideo(isVisible && !isInteracting);
	}, [isVisible, isInteracting]);

	useEffect(() => {
		if (currentIndex === index) {
			videoRef.current?.seek(0);
		}
	}, [currentIndex, index]);

	if (item.multimedia.media_type === MediaType.image) {
		return (
			<Image
				source={{
					uri: urlForKey(item.multimedia.image?.original.key)
				}}
				style={{
					width: dimensions.width,
					height: dimensions.height
				}}
				resizeMode='cover'
			/>
		);
	}

	if (item.multimedia.media_type === MediaType.video) {
		return (
			<View position='relative'>
				<Video
					ref={videoRef}
					source={{
						uri: urlForKey(item.multimedia.video?.media.key)
					}}
					style={{
						width: dimensions.width,
						height: dimensions.height
					}}
					muted={!soundEnabled}
					resizeMode='cover'
					paused={!shouldPlayVideo}
					repeat
				/>
				<Pressable onPress={toggleSoundEnabled}>
					<MediaLayover
						style={{
							right: 0,
							bottom: 0
						}}
					>
						<Icon
							name={soundEnabled ? 'volume-on' : 'volume-off'}
							size='m'
							color='white'
						/>
					</MediaLayover>
				</Pressable>
			</View>
		);
	}
};

export default FlatListItem;
