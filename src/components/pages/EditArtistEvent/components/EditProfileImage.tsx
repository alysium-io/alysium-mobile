import { Section } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { usePriorityImage } from '@hooks';
import { EditableProfileImage } from '@molecules';
import React from 'react';
import { Asset } from 'react-native-image-picker';

interface EditProfileImageProps {
	updateArtistEventProfileImage: (profileImage: Asset) => void;
	isProfileImageLoading: boolean;
	eventData?: FindOneArtistEventResponseDto;
}

const EditProfileImage: React.FC<EditProfileImageProps> = ({
	updateArtistEventProfileImage,
	isProfileImageLoading,
	eventData
}) => {
	const { currentUrl } = usePriorityImage(eventData?.event.profile_image);

	return (
		<Section marginVertical='xxl' alignItems='center'>
			<EditableProfileImage
				size='large'
				onChooseImage={updateArtistEventProfileImage}
				image={currentUrl}
				isLoading={isProfileImageLoading}
				defaultImageProps={{
					icon: 'event'
				}}
			/>
		</Section>
	);
};

export default EditProfileImage;
