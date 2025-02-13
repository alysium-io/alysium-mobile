import { useImage } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface ImageItemProps extends Props<typeof TouchableOpacity> {
	uri?: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ uri, ...props }) => {
	const { urlForKey } = useImage();
	return (
		<TouchableOpacity activeOpacity={0.8} {...props}>
			<Image
				source={{ uri: urlForKey(uri) }}
				style={{ width: '100%', height: '100%' }}
				resizeMode='cover'
			/>
		</TouchableOpacity>
	);
};

export default ImageItem;
