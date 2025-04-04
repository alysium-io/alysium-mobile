import { Video, View } from '@atomic';
import { useImage, useIsLoaded } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import LoadingItem from './LoadingItem';

interface VideoItemProps extends Props<typeof TouchableOpacity> {
	uri?: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ uri, ...props }) => {
	const { urlForKey } = useImage();
	const { isLoaded, onLoad } = useIsLoaded();

	return (
		<TouchableOpacity activeOpacity={0.8} {...props}>
			<Video
				onReadyForDisplay={onLoad}
				paused
				source={{
					uri: urlForKey(uri)
				}}
				style={{ width: '100%', height: '100%' }}
			/>
			{!isLoaded && (
				<View position='absolute' top={0} left={0} right={0} bottom={0}>
					<LoadingItem />
				</View>
			)}
		</TouchableOpacity>
	);
};

export default VideoItem;
