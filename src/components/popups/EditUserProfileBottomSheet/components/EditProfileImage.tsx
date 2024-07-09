import { View } from '@atomic';
import { EditableProfileImage } from '@molecules';
import { ContentType } from '@types';
import React from 'react';

const EditProfileImage = () => {
	return (
		<View margin='m' justifyContent='center' alignItems='center'>
			<EditableProfileImage image={undefined} contentType={ContentType.user} />
		</View>
	);
};

export default EditProfileImage;
