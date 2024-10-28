import { FindGalleryResponseDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { MediaType } from '@flux/api/media/types';
import React, { useState } from 'react';
import { OnLoadData } from 'react-native-video';
import DetatchPanResponder from './components/DetatchPanResponder';
import Reels from './components/Reels';
import usePlayPauseAnimation from './usePlayPauseAnimation';
import useVideoControl from './useVideoControl';

interface ScrollReelProps {
	transitionTagId: string;
	data?: FindGalleryResponseDto;
}

const ScrollReel: React.FC<ScrollReelProps> = ({ transitionTagId, data }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const videoControl = useVideoControl();
	const {
		playAnimatedValue,
		pauseAnimatedValue,
		runPlayAnimation,
		runPauseAnimation
	} = usePlayPauseAnimation();

	const playCurrentVideo = () => {
		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
		if (mediaType === MediaType.video) {
			videoControl.play(currentIndex);
		}
	};

	const pauseCurrentVideo = () => {
		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
		if (mediaType === MediaType.video) {
			videoControl.pause(currentIndex);
		}
	};

	const rewindCurrentVideo = () => {
		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
		if (mediaType === MediaType.video) {
			videoControl.rewind(currentIndex);
		}
	};

	const toggleCurrentVideoPlay = () => {
		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
		if (mediaType === MediaType.video) {
			const isPaused = videoControl.getIsPaused(currentIndex);
			if (isPaused) {
				runPlayAnimation();
			} else {
				runPauseAnimation();
			}

			videoControl.togglePlay(currentIndex);
		}
	};

	const onLoadConfigVideo = (onLoadData: OnLoadData) => {
		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
		if (mediaType === MediaType.video) {
			videoControl.setDuration(currentIndex, onLoadData.duration);
		}
	};

	return (
		<DetatchPanResponder
			playCurrentVideo={playCurrentVideo}
			pauseCurrentVideo={pauseCurrentVideo}
		>
			<Reels
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
				videoControl={videoControl}
				playAnimatedValue={playAnimatedValue}
				pauseAnimatedValue={pauseAnimatedValue}
				data={data}
				playCurrentVideo={playCurrentVideo}
				pauseCurrentVideo={pauseCurrentVideo}
				rewindCurrentVideo={rewindCurrentVideo}
				toggleCurrentVideoPlay={toggleCurrentVideoPlay}
				onLoadConfigVideo={onLoadConfigVideo}
				transitionTagId={transitionTagId}
			/>
		</DetatchPanResponder>
	);
};

export default ScrollReel;
