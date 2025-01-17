import { Avatar, DefaultImage, SkeletonPlaceholder, View } from '@atomic';
import { usePhotosAndCamera } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import EditIcon from './EditIcon';

const sizes = {
	medium: 80,
	large: 120
};

interface EditableProfileImageProps
	extends Props<typeof TouchableWithoutFeedback> {
	image?: string;
	defaultImageProps?: Props<typeof DefaultImage>;
	onChooseImage?: (imagePickerAsset: Asset) => void;
	size?: keyof typeof sizes;
	isLoading?: boolean;
}

const EditableProfileImage: React.FC<EditableProfileImageProps> = ({
	image,
	onChooseImage,
	defaultImageProps,
	size = 'medium',
	isLoading = false,
	...props
}) => {
	const { chooseMediaOrTakeNew, extractAsset } = usePhotosAndCamera();

	const onPress = async () => {
		try {
			const newImage = await chooseMediaOrTakeNew('photo');
			const asset = extractAsset(newImage);
			if (asset) {
				onChooseImage && onChooseImage(asset);
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
		<TouchableWithoutFeedback
			onPress={onPress}
			{...props}
			disabled={props.disabled || isLoading}
		>
			<View style={[styles.container, { width: sizes[size] }]}>
				<If condition={isLoading}>
					<Then>
						<SkeletonPlaceholder>
							<View style={styles.image} />
						</SkeletonPlaceholder>
					</Then>
					<Else>
						<Avatar image={image} defaultImageProps={defaultImageProps} />
						<View style={styles.iconContainer}>
							<EditIcon />
						</View>
					</Else>
				</If>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
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
