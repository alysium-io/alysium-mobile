import { View } from '@atomic';
import { Multimedia } from '@flux/api/media';
import { MediaType } from '@flux/api/media/types';
import React from 'react';
import { Case, Switch } from 'react-if';
import { useWindowDimensions } from 'react-native';
import { OnLoadData } from 'react-native-video';
import { REEL_HEIGHT } from '../settings';
import { VideoControlApi } from '../useVideoControl';
import PriorityImage from './PriorityImage';
import PriorityVideo from './PriorityVideo';

interface FlatListItemProps {
	index: number;
	multimedia: Multimedia;
	currentIndex: number;
	transitionTagId: string;
	videoControl: VideoControlApi;
	toggleCurrentVideoPlay: () => void;
	onLoadConfigVideo: (onLoadData: OnLoadData) => void;
}

const FlatListItem: React.FC<FlatListItemProps> = ({
	index,
	multimedia,
	currentIndex,
	transitionTagId,
	videoControl,
	toggleCurrentVideoPlay,
	onLoadConfigVideo
}) => {
	const { width } = useWindowDimensions();

	return (
		<View
			style={{
				width,
				height: REEL_HEIGHT
			}}
		>
			<Switch>
				<Case condition={multimedia.media_type === MediaType.image}>
					<PriorityImage
						index={index}
						image={multimedia.image}
						currentIndex={currentIndex}
						transitionTagId={transitionTagId}
					/>
				</Case>
				<Case condition={multimedia.media_type === MediaType.video}>
					<PriorityVideo
						index={index}
						video={multimedia.video}
						currentIndex={currentIndex}
						transitionTagId={transitionTagId}
						videoControl={videoControl}
						toggleCurrentVideoPlay={toggleCurrentVideoPlay}
						onLoadConfigVideo={onLoadConfigVideo}
					/>
				</Case>
			</Switch>
		</View>
	);
};

export default FlatListItem;
