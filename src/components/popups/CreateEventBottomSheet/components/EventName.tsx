import { View } from '@atomic';
import { TextInputApi } from '@hooks';
import { TextInput } from '@molecules';
import React from 'react';

interface EventNameProps {
	eventNameTextInputApi: TextInputApi;
	setEventName: (text: string) => void;
}

const EventName: React.FC<EventNameProps> = ({
	eventNameTextInputApi,
	setEventName
}) => {
	return (
		<View margin='m' marginTop='l'>
			<TextInput
				textInputApi={eventNameTextInputApi}
				placeholder='Event Name'
				onChangeText={setEventName}
			/>
		</View>
	);
};

export default EventName;
