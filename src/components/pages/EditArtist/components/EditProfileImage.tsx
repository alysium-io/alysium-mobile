import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section } from '@atomic';
import { EditableProfileImage } from '@molecules';
import React from 'react';
import { Asset } from 'react-native-image-picker';

interface EditProfileImageProps {
	profileImage: Asset | null;
	setProfileImage: (profileImage: Asset | null) => void;
}

const EditProfileImage: React.FC<EditProfileImageProps> = ({
	profileImage,
	setProfileImage
}) => {
	const { artistData } = useArtistAppContext();
	return (
		<Section marginVertical='xxl' alignItems='center'>
			<EditableProfileImage
				size='large'
				onChooseImage={setProfileImage}
				image={
					profileImage === null
						? artistData.profile_image?.medium.key
						: profileImage.uri
				}
			/>
		</Section>
	);
};

export default EditProfileImage;
