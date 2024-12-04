import { Section } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
import { TitleTextInput } from '@molecules';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface EditEventNameProps {
	eventData: FindOneArtistEventResponseDto;
	control: Control<UpdateArtistEventBodyDto>;
	onBlurEditable: () => void;
}

const EditEventName: React.FC<EditEventNameProps> = ({
	eventData,
	control,
	onBlurEditable
}) => {
	return (
		<Section margin='m' marginBottom='none'>
			<Controller
				name='name'
				rules={{ required: true }}
				control={control}
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
