import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section } from '@atomic';
import { EditableProfileImage } from '@molecules';
import React from 'react';
import { Asset } from 'react-native-image-picker';

interface EditProfileImageProps {
	updateArtistProfileImage: (profileImage: Asset) => void;
	isProfileImageLoading: boolean;
}

const EditProfileImage: React.FC<EditProfileImageProps> = ({
	updateArtistProfileImage,
	isProfileImageLoading
}) => {
	const { artistData } = useArtistAppContext();
	return (
		<Section marginVertical='xxl' alignItems='center'>
			<EditableProfileImage
				size='large'
				onChooseImage={updateArtistProfileImage}
				image={artistData.profile_image?.medium.key}
				isLoading={isProfileImageLoading}
			/>
		</Section>
	);
};

export default EditProfileImage;
