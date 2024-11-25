import { Image, Text, View } from '@atomic';
import React from 'react';
import { TouchableOpacity } from 'react-native';
const instagramImage = require('@src/assets/images/instagram.png');
const iMessageImage = require('@src/assets/images/imessage.png');

const IMAGE_SIZE = 65;

const images: Record<'instagram' | 'imessage', any> = {
	instagram: instagramImage,
	imessage: iMessageImage
};

interface ShareExternalProps {
	title: string;
	image?: 'instagram' | 'imessage';
	onPress: () => void;
	CustomImage?: React.FC<any>;
}

const ShareButton: React.FC<ShareExternalProps> = ({
	title,
	image,
	onPress,
	CustomImage
}) => {
	if (CustomImage === undefined && image === undefined) {
		throw new Error('CustomImage or image prop is required');
	}

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
			<View alignItems='center' marginRight='l'>
				<View height={IMAGE_SIZE} width={IMAGE_SIZE}>
					{CustomImage !== undefined ? (
						<CustomImage />
					) : (
						<Image
							style={{ height: '100%', width: '100%' }}
							source={image && images[image]}
						/>
					)}
				</View>
				<Text marginTop='s'>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ShareButton;
