import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { EditableProfileImage } from '@molecules';
import React, { useState } from 'react';
import { Asset } from 'react-native-image-picker';

const ProfileImage = () => {
	const { artistData, artistIsLoading } = useArtistAppContext();
	const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);
	const [createArtistProfileImageMutation] =
		profileImageApiSlice.useCreateArtistProfileImageMutation();

	const updateArtistProfileImage = async (profileImage: Asset) => {
		try {
			setIsProfileImageLoading(true);
			await createArtistProfileImageMutation({
				file: profileImage,
				query: { artist_uid: artistData.artist_uid }
			});
		} finally {
			setIsProfileImageLoading(false);
		}
	};

	return (
		<View alignItems='center' marginVertical='xl'>
			<EditableProfileImage
				size='large'
				onChooseImage={updateArtistProfileImage}
				image={artistData.profile_image?.medium.key}
				isLoading={artistIsLoading || isProfileImageLoading}
				defaultImageProps={{
					icon: 'artist'
				}}
			/>
		</View>
	);
};

export default ProfileImage;
