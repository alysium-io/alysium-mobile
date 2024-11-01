import { Section } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { TitleTextInput } from '@molecules';
import { UpdateArtistEventFormApi } from '@src/utils/redux-hook-form/useUpdateArtistEventFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';

interface EditEventNameProps {
	eventData: FindOneArtistEventResponseDto;
	updateArtistEventFormApi: UpdateArtistEventFormApi;
	onBlurEditable: () => void;
}

const EditEventName: React.FC<EditEventNameProps> = ({
	eventData,
	updateArtistEventFormApi,
	onBlurEditable
}) => {
	return (
		<Section>
			<Controller
				name='name'
				rules={{ required: true }}
				control={updateArtistEventFormApi.formMethods.control}
				render={({ field: { onChange } }) => (
					<TitleTextInput
						placeholder='Event name'
						onChangeText={onChange}
						defaultValue={eventData.event.name}
						onBlur={onBlurEditable}
					/>
				)}
			/>
		</Section>
	);
};

export default EditEventName;
