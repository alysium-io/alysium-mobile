import { Image, Text, View } from '@atomic';
import { IconNames } from '@svg';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import CustomShareButtonIcon from './components/CustomShareButtonIcon';
const instagramImage = require('@src/assets/images/instagram.png');
const iMessageImage = require('@src/assets/images/imessage.png');

const IMAGE_SIZE = 65;

const images: Record<'instagram' | 'imessage', any> = {
	instagram: instagramImage,
	imessage: iMessageImage
};

interface CircularButtonProps {
	title: string;
	image?: 'instagram' | 'imessage';
	icon?: IconNames;
	onPress: () => void;
	titleProps?: Props<typeof Text>;
	containerProps?: Props<typeof View>;
	iconProps?: Props<typeof CustomShareButtonIcon>;
}

const CircularButton: React.FC<CircularButtonProps> = ({
	title,
	image,
	onPress,
	titleProps,
	containerProps,
	iconProps
}) => {
	if (iconProps?.name === undefined && image === undefined) {
		throw new Error('CustomImage or image prop is required');
	}

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
			<View alignItems='center' {...containerProps}>
				<View height={IMAGE_SIZE} width={IMAGE_SIZE}>
					{iconProps?.name !== undefined ? (
						<CustomShareButtonIcon {...iconProps} />
					) : (
						<Image
							style={{ height: '100%', width: '100%' }}
							source={image && images[image]}
						/>
					)}
				</View>
				<Text
					marginTop='s'
					color='text.p'
					variant='paragraph-small-medium'
					{...titleProps}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CircularButton;
