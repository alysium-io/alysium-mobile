import { View } from '@atomic';
import { CreateEventBodyDto } from '@flux/api/event/dto/event-create.dto';
import { TextInputApi } from '@hooks';
import { EditableTextInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface EventNameProps {
	eventNameTextInputApi: TextInputApi;
	formMethods: UseFormReturn<CreateEventBodyDto>;
}

const EventName: React.FC<EventNameProps> = ({
	eventNameTextInputApi,
	formMethods
}) => {
	return (
		<View margin='m' marginTop='l'>
			<Controller
				name='name'
				control={formMethods.control}
				render={({ field: { value, onChange } }) => (
					<EditableTextInputWithLabel
						textInputApi={eventNameTextInputApi}
						placeholder='SubSessions, Block Party, etc.'
						onChangeText={onChange}
						value={value}
						label='Event Name'
					/>
				)}
			/>
		</View>
	);
};

export default EventName;
