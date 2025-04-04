import { useMergedRef } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import React, { forwardRef } from 'react';
import RNVideo, { ReactVideoProps, VideoRef } from 'react-native-video';

const Video = forwardRef<VideoRef, ReactVideoProps>((props, ref) => {
	const videoRef = useMergedRef<VideoRef>(ref);
	const [isScreenFocused, setIsScreenFocused] = React.useState(true);

	// Use useFocusEffect to handle screen focus changes
	useFocusEffect(
		React.useCallback(() => {
			// When screen comes into focus
			setIsScreenFocused(true);

			// Cleanup function when screen goes out of focus
			return () => {
				setIsScreenFocused(false);
			};
		}, [])
	);

	return (
		<RNVideo
			ref={videoRef}
			{...props}
			paused={props.paused || !isScreenFocused}
		/>
	);
});

export default Video;
