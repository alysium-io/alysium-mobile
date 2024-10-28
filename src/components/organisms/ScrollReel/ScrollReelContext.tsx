// import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
// import { galleryApiSlice } from '@flux/api/gallery';
// import { FindGalleryResponseDto } from '@flux/api/gallery/dto/gallery-find.dto';
// import { MediaRefType, MediaType } from '@flux/api/media/types';
// import { createUseContextHook } from '@hooks';
// import { ProviderProps } from '@types';
// import React, { createContext, useState } from 'react';
// import { SharedValue } from 'react-native-reanimated';
// import { OnLoadData } from 'react-native-video';
// import usePlayPauseAnimation from './usePlayPauseAnimation';
// import useVideoControl, { VideoControlApi } from './useVideoControl';

// export type ScrollReelContextType = {
// 	currentIndex: number;
// 	setCurrentIndex: (index: number) => void;
// 	videoControl: VideoControlApi;
// 	transitionTagId: string;
// 	data?: FindGalleryResponseDto;
// 	playCurrentVideo: () => void;
// 	pauseCurrentVideo: () => void;
// 	rewindCurrentVideo: () => void;
// 	toggleCurrentVideoPlay: () => void;
// 	seekCurrentVideo: (percentage: number) => void;
// 	onLoadConfigVideo: (data: OnLoadData) => void;
// 	playAnimatedValue: SharedValue<number>;
// 	pauseAnimatedValue: SharedValue<number>;
// 	runPlayAnimation: () => void;
// 	runPauseAnimation: () => void;
// };

// export const ScrollReelContext = createContext({} as ScrollReelContextType);

// export interface ScrollReelProviderProps extends ProviderProps {
// 	transitionTagId: string;
// }

// export const ScrollReelProvider: React.FC<ScrollReelProviderProps> = ({
// 	transitionTagId,
// 	children
// }) => {
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const videoControl = useVideoControl();
// 	const {
// 		playAnimatedValue,
// 		pauseAnimatedValue,
// 		runPlayAnimation,
// 		runPauseAnimation
// 	} = usePlayPauseAnimation();

// 	const { artistData } = useArtistAppContext();
// 	const { data } = galleryApiSlice.useFindGalleryQuery({
// 		params: {
// 			refType: MediaRefType.artist,
// 			refId: artistData.artist_uid
// 		}
// 	});

// 	const playCurrentVideo = () => {
// 		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
// 		if (mediaType === MediaType.video) {
// 			videoControl.play(currentIndex);
// 		}
// 	};

// 	const pauseCurrentVideo = () => {
// 		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
// 		if (mediaType === MediaType.video) {
// 			videoControl.pause(currentIndex);
// 		}
// 	};

// 	const rewindCurrentVideo = () => {
// 		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
// 		if (mediaType === MediaType.video) {
// 			videoControl.rewind(currentIndex);
// 		}
// 	};

// 	const toggleCurrentVideoPlay = () => {
// 		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
// 		if (mediaType === MediaType.video) {
// 			const isPaused = videoControl.getIsPaused(currentIndex);
// 			if (isPaused) {
// 				runPlayAnimation();
// 			} else {
// 				runPauseAnimation();
// 			}

// 			videoControl.togglePlay(currentIndex);
// 		}
// 	};

// 	const seekCurrentVideo = (percentage: number) => {
// 		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
// 		if (mediaType === MediaType.video) {
// 			videoControl.seek(currentIndex, percentage);
// 		}
// 	};

// 	const onLoadConfigVideo = (onLoadData: OnLoadData) => {
// 		const mediaType = data?.items[currentIndex]?.multimedia.media_type;
// 		if (mediaType === MediaType.video) {
// 			videoControl.setDuration(currentIndex, onLoadData.duration);
// 		}
// 	};
// 	console.log('here');
// 	return (
// 		<ScrollReelContext.Provider
// 			value={{
// 				currentIndex,
// 				setCurrentIndex,
// 				videoControl,
// 				transitionTagId,
// 				data,
// 				playCurrentVideo,
// 				pauseCurrentVideo,
// 				rewindCurrentVideo,
// 				toggleCurrentVideoPlay,
// 				seekCurrentVideo,
// 				onLoadConfigVideo,
// 				playAnimatedValue,
// 				pauseAnimatedValue,
// 				runPlayAnimation,
// 				runPauseAnimation
// 			}}
// 		>
// 			{children}
// 		</ScrollReelContext.Provider>
// 	);
// };

// export const useScrollReelContext = createUseContextHook<ScrollReelContextType>(
// 	ScrollReelContext,
// 	'ScrollReelContext'
// );
