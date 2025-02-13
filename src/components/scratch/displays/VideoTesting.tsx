import { Text, View } from '@atomic';
import { usePhotosAndCamera } from '@hooks';
import { Button } from '@molecules';
import React, { useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';

const VideoTesting = () => {
	const insets = useSafeAreaInsets();
	const { chooseMediaOrTakeNew } = usePhotosAndCamera();
	const [asset, setAsset] = useState<Asset | null>(null);
	const onPress = async () => {
		const response = await chooseMediaOrTakeNew('video');
		console.log(response);
		const asset = response?.assets?.[0];
		if (asset) {
			setAsset(asset);
		}
	};
	return (
		<View style={{ paddingTop: insets.top }}>
			<Text>Video Testing</Text>
			<Button text='Press me' onPress={onPress} />
			{asset && (
				<View>
					<Video
						paused
						source={{ uri: asset.uri }}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: 200,
							zIndex: -1
						}}
					/>
				</View>
			)}
		</View>
	);
};

export default VideoTesting;
