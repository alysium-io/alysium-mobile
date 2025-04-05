import { Text, Video, View } from '@atomic';
import { formatSplitTime } from '@etc';
import { usePhotosAndCamera } from '@hooks';
import { Button } from '@molecules';
import React, { useRef, useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { VideoRef } from 'react-native-video';

const ImagePickerTesting = () => {
	const { chooseMediaOrTakeNew } = usePhotosAndCamera();

	const videoRef = useRef<VideoRef>(null);
	const [asset, setAsset] = useState<Asset | null>(null);
	const [duration, setDuration] = useState<string | null>(null);

	const onPress = async () => {
		const result = await chooseMediaOrTakeNew('video');
		console.log(result?.assets?.[0]);
		setAsset(result?.assets?.[0] ?? null);
	};

	const log = () => {
		console.log('Video duration:', duration);
	};

	return (
		<View flex={1} justifyContent='center' alignItems='center' gap='m'>
			<Text variant='page-header'>Select a video</Text>
			<Button onPress={onPress} text='Choose Video' />
			<Button onPress={log} text='Log Duration' />
			<Text variant='page-header'>{duration}</Text>
			<Video
				ref={videoRef}
				source={{
					uri: asset?.uri
				}}
				style={{ width: 300, height: 300 }}
				paused
				onLoad={(data) => {
					setDuration(formatSplitTime(data.duration));
				}}
			/>
		</View>
	);
};

export default ImagePickerTesting;
