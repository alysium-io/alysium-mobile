import { View } from '@atomic';
import { EditableProfileImage } from '@molecules';
import { ContentType } from '@types';
import React from 'react';
import { useEditEventPageContext } from '../EditEvent.context';

const PrimaryImage = () => {
	const { eventData, setEventProfileImage } = useEditEventPageContext();

	return (
		<View marginTop='l' flexDirection='row' justifyContent='center'>
			<EditableProfileImage
				image={eventData.profile_image?.url || ''}
				onChooseImage={setEventProfileImage}
				contentType={ContentType.event}
			/>
		</View>
	);
};

export default PrimaryImage;
