import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

interface ImageItemProps extends Props<typeof TouchableOpacity> {
	uri?: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ uri, ...props }) => {
	return (
		<TouchableOpacity style={{ flex: 1 }} {...props}>
			<View flex={1}>
				<Animated.Image
					source={{ uri }}
					style={{ width: '100%', height: '100%' }}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default ImageItem;
