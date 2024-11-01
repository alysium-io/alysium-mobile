import { DismissKeyboardWrapper, Text, View } from '@atomic';
import { TextInputApi } from '@hooks';
import { TextBox } from '@molecules';
import { CreateArtistEventFormApi } from '@src/utils/redux-hook-form/useCreateArtistEventFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';

interface EventNameProps {
	createArtistEventFormApi: CreateArtistEventFormApi;
	eventNameTextInputApi: TextInputApi;
}

const EventName: React.FC<EventNameProps> = ({
	createArtistEventFormApi,
	eventNameTextInputApi
}) => {
	return (
		<DismissKeyboardWrapper>
			<View margin='m'>
				<Text marginBottom='m' marginLeft='s' marginTop='m'>
					Event Name
				</Text>
				<Controller
					name='name'
					control={createArtistEventFormApi.formMethods.control}
					rules={{ required: 'Name is required' }}
					render={({ field: { onChange } }) => (
						<TextBox
							textInputApi={eventNameTextInputApi}
							onChangeText={onChange}
							placeholder='What was the event called?'
							subtitle="EDX Nightclub on Tuesdays, Sarah's Wedding, Ultra Miami 2024, etc."
						/>
					)}
				/>
			</View>
		</DismissKeyboardWrapper>
	);
};

export default EventName;
