import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { usePriorityImage } from '@hooks';
import { EditableProfileImage } from '@molecules';
import React, { useState } from 'react';
import { Asset } from 'react-native-image-picker';

interface EditEventProfileImageProps {
	event_uid: string;
}

const EditEventProfileImage: React.FC<EditEventProfileImageProps> = ({
	event_uid
}) => {
	const { artistData } = useArtistAppContext();
	const [createArtistEventProfileImageMutation] =
		profileImageApiSlice.useCreateArtistEventProfileImageMutation();
	const [isProfileImageLoading, setIsProfileImageLoading] =
		useState<boolean>(false);
	const { data } = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			event_uid,
			artist_uid: artistData.artist_uid
		}
	});
	const { currentUrl } = usePriorityImage(data?.event.profile_image);

	const updateArtistEventProfileImage = (profileImage: Asset) => {
		if (data) {
			setIsProfileImageLoading(true);
			createArtistEventProfileImageMutation({
				file: profileImage,
				query: {
					event_uid: data.event.event_uid
				}
			}).finally(() => {
				setIsProfileImageLoading(false);
			});
		}
	};

	return (
		<View marginVertical='xxl' alignItems='center'>
			<EditableProfileImage
				size='large'
				onChooseImage={updateArtistEventProfileImage}
				image={currentUrl}
				isLoading={isProfileImageLoading}
				defaultImageProps={{
					icon: 'event'
				}}
			/>
		</View>
	);
};

export default EditEventProfileImage;
