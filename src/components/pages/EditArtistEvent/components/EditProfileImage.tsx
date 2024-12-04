import { Section } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { usePriorityImage } from '@hooks';
import { EditableProfileImage } from '@molecules';
import React, { useState } from 'react';
import { Asset } from 'react-native-image-picker';

interface EditProfileImageProps {
	eventData: FindOneArtistEventResponseDto;
}

const EditProfileImage: React.FC<EditProfileImageProps> = ({ eventData }) => {
	const [createArtistEventProfileImageMutation] =
		profileImageApiSlice.useCreateArtistEventProfileImageMutation();
	const [isProfileImageLoading, setIsProfileImageLoading] =
		useState<boolean>(false);
	const updateArtistEventProfileImage = (profileImage: Asset) => {
		setIsProfileImageLoading(true);
		createArtistEventProfileImageMutation({
			file: profileImage,
			query: {
				event_uid: eventData.event.event_uid
			}
		}).finally(() => {
			// We give it an extra second to give it time to invalidate the cache
			// to avoid flickering
			setTimeout(() => {
				setIsProfileImageLoading(false);
			}, 1000);
		});
	};
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
