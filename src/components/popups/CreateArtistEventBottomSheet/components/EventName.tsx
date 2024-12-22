import { DismissKeyboardWrapper, Text, View } from '@atomic';
import { CreateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-create.dto';
import { TextBox } from '@molecules';
import React, { useEffect, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';

interface EventNameProps {
	control: Control<CreateArtistEventBodyDto>;
}

const EventName: React.FC<EventNameProps> = ({ control }) => {
	const ref = useRef<TextInput>(null);
	useEffect(() => {
		setTimeout(() => {
			ref.current?.focus();
		}, 300);
	}, []);

	return (
		<DismissKeyboardWrapper>
			<View margin='m'>
				<Text marginBottom='m' marginLeft='s' marginTop='m'>
					Event Name
				</Text>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Name is required' }}
					render={({ field: { onChange } }) => (
						<TextBox
							ref={ref}
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
