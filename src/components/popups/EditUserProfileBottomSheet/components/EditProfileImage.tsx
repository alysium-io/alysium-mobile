import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { View } from '@atomic';
import { EditableProfileImage } from '@molecules';
import React from 'react';

const EditProfileImage = () => {
	const { userData, setUserProfileImage } = useUserAppContext();
	return (
		<View margin='m' justifyContent='center' alignItems='center'>
			<EditableProfileImage
				image={userData.profile_image?.small.key}
				onChooseImage={setUserProfileImage}
			/>
		</View>
	);
};

export default EditProfileImage;
