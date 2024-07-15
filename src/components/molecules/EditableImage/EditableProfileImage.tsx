import { Avatar, View } from '@atomic';
import { usePhotosAndCamera } from '@hooks';
import { ContentType, Persona } from '@types';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Asset } from 'react-native-image-picker';
import EditIcon from './EditIcon';

interface EditableProfileImageProps {
	image?: string;
	onChooseImage?: (imagePickerAsset: Asset) => void;
	contentType?: ContentType;
}

const EditableProfileImage: React.FC<EditableProfileImageProps> = ({
	image,
	onChooseImage,
	contentType = Persona.user
}) => {
	const { chooseImageOrTakeNewPhoto } = usePhotosAndCamera();

	const onPress = async () => {
		const newImage = await chooseImageOrTakeNewPhoto();
		if (
			newImage &&
			onChooseImage &&
			newImage.assets &&
			newImage.assets.length > 0
		) {
			onChooseImage(newImage.assets[0]);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Avatar image={image} contentType={contentType} />
				<View style={styles.iconContainer}>
					<EditIcon />
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 80,
		aspectRatio: 1
	},
	image: {
		height: '100%',
		width: '100%',
		borderRadius: 1000
	},
	iconContainer: {
		position: 'absolute',
		left: '72%',
		bottom: '2%'
	}
});

export default EditableProfileImage;
