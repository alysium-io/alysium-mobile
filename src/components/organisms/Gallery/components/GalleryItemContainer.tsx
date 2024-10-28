import { View } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GALLERY_ITEM_SIZE } from '../settings';

interface GalleryItemContainerProps extends IChildrenProps {
	onPress?: () => void;
}

const GalleryItemContainer: React.FC<GalleryItemContainerProps> = ({
	onPress,
	children
}) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.95}>
			<View
				backgroundColor='bg.light'
				style={{
					height: GALLERY_ITEM_SIZE,
					width: GALLERY_ITEM_SIZE
				}}
			>
				{children}
			</View>
		</TouchableOpacity>
	);
};

export default GalleryItemContainer;
