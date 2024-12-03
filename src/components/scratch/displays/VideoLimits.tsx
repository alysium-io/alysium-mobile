import { View } from '@atomic';
import { usePhotosAndCamera } from '@hooks';
import { Button } from '@molecules';
import React from 'react';

const VideoLimits = () => {
	const { chooseMediaOrTakeNew } = usePhotosAndCamera();

	const onPress = async () => {
		const result = await chooseMediaOrTakeNew();
		console.log(result);
	};

	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Button text='Press Me' onPress={onPress} />
		</View>
	);
};

export default VideoLimits;
