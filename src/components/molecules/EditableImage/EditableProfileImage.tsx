import { Avatar, View } from '@atomic';
import { usePhotosAndCamera } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import EditIcon from './EditIcon';

interface EditableProfileImageProps {
	image?: string;
	onChooseImage?: (imagePickerAsset: Asset) => void;
}

const EditableProfileImage: React.FC<EditableProfileImageProps> = ({
	image,
	onChooseImage
}) => {
	const { chooseImageOrTakeNewPhoto } = usePhotosAndCamera();

	const onPress = async () => {
		try {
			const newImage = await chooseImageOrTakeNewPhoto();
			if (
				newImage &&
				onChooseImage &&
				newImage.assets &&
				newImage.assets.length > 0
			) {
				onChooseImage(newImage.assets[0]);
			}
		} catch {
			Toast.show({
				type: 'error',
				text1: 'Failed to choose image',
				text2: 'Something went wrong, please try again'
			});
		}
	};

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Avatar image={image} />
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
