import { View } from '@atomic';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface GalleryItemContainerProps extends TouchableOpacityProps {
	onPress?: () => void;
}

const GalleryItemContainer: React.FC<GalleryItemContainerProps> = ({
	onPress,
	children
}) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8}>
			<View backgroundColor='bg.q' style={{ height: '100%' }}>
				{children}
			</View>
		</TouchableOpacity>
	);
};

export default GalleryItemContainer;
