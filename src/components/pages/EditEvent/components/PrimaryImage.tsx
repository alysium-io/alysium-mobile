import { View } from '@atomic';
import { EditableProfileImage } from '@molecules';
import React from 'react';
import { useEditEventPageContext } from '../EditEventPage.context';

const PrimaryImage = () => {
	const { eventData, changeEventImage } = useEditEventPageContext();

	return (
		<View marginTop='l' flexDirection='row' justifyContent='center'>
			<EditableProfileImage
				image={eventData.profile_image?.url || ''}
				onChooseImage={changeEventImage}
			/>
		</View>
	);
};

export default PrimaryImage;
