import { View } from '@atomic';
import { FindGalleryResponseDto } from '@flux/api/gallery/dto/gallery-find.dto';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import { OnLoadData } from 'react-native-video';
import { REEL_HEIGHT } from '../settings';
import { VideoControlApi } from '../useVideoControl';
import ControlsOverlay from './ControlsOverlay';
import FlatList from './FlatList';
import PlayPauseAnimation from './PlayPauseAnimation';

interface ReelsProps {
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
	videoControl: VideoControlApi;
	transitionTagId: string;
	data?: FindGalleryResponseDto;
	playCurrentVideo: () => void;
	pauseCurrentVideo: () => void;
	rewindCurrentVideo: () => void;
	toggleCurrentVideoPlay: () => void;
	onLoadConfigVideo: (data: OnLoadData) => void;
	playAnimatedValue: SharedValue<number>;
	pauseAnimatedValue: SharedValue<number>;
}

const Reels: React.FC<ReelsProps> = ({
	currentIndex,
	setCurrentIndex,
	videoControl,
	transitionTagId,
	data,
	playCurrentVideo,
	pauseCurrentVideo,
	rewindCurrentVideo,
	toggleCurrentVideoPlay,
	onLoadConfigVideo,
	playAnimatedValue,
	pauseAnimatedValue
}) => {
	return (
		<View flex={1}>
			<View height={REEL_HEIGHT}>
				{data && (
					<FlatList
						items={data.items.map((item, index) => ({
							multimedia: item.multimedia,
							index,
							currentIndex,
							setCurrentIndex,
							rewindCurrentVideo,
							playCurrentVideo,
							pauseCurrentVideo,
							transitionTagId,
							videoControl,
							toggleCurrentVideoPlay,
							onLoadConfigVideo
						}))}
						currentIndex={currentIndex}
						setCurrentIndex={setCurrentIndex}
						rewindCurrentVideo={rewindCurrentVideo}
						playCurrentVideo={playCurrentVideo}
						pauseCurrentVideo={pauseCurrentVideo}
					/>
				)}
			</View>
			<ControlsOverlay />
			<PlayPauseAnimation
				playAnimatedValue={playAnimatedValue}
				pauseAnimatedValue={pauseAnimatedValue}
			/>
		</View>
	);
};

export default Reels;
