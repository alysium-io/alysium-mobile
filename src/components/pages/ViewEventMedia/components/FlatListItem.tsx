import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { MediaType } from '@flux/api/media/types';
import { useImage } from '@hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Image, LayoutRectangle } from 'react-native';
import Video, { VideoRef } from 'react-native-video';

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
			/>
		);
	}

	if (item.multimedia.media_type === MediaType.video) {
		return (
			<Video
				ref={videoRef}
				source={{
					uri: urlForKey(item.multimedia.video?.media.key)
				}}
				style={{
					width: dimensions.width,
					height: dimensions.height
				}}
				repeat={true}
				paused={!shouldPlayVideo}
			/>
		);
	}
};

export default FlatListItem;
