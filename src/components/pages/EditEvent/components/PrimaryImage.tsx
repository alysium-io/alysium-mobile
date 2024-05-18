import { View } from '@atomic';
import { EditableProfileImage } from '@molecules';
import { ContentType } from '@types';
import React from 'react';
import { Asset } from 'react-native-image-picker';

interface PrimaryImageProps {
	imageUrl?: string;
	setEventProfileImage: (image: Asset) => void;
}

const PrimaryImage: React.FC<PrimaryImageProps> = ({
	imageUrl,
	setEventProfileImage
}) => {
	return (
		<View marginTop='l' flexDirection='row' justifyContent='center'>
			<EditableProfileImage
				image={imageUrl}
				onChooseImage={setEventProfileImage}
				contentType={ContentType.event}
			/>
		</View>
	);
};

export default PrimaryImage;
