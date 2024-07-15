import { DismissKeyboardWrapper, View } from '@atomic';
import {
	InternationalPhoneNumberTextInput,
	PhoneNumberTextInputWithLabel,
	TextInputWithLabel,
	TitleTextInput
} from '@molecules';
import React from 'react';

const Inputs = () => {
	const handleOnChange = (text: string) => {
		console.log('Received text:', text);
	};

	return (
		<DismissKeyboardWrapper>
			<View margin='m' flex={1}>
				<InternationalPhoneNumberTextInput onChangeText={handleOnChange} />
				<TitleTextInput
					icon='lock'
					placeholder='Event'
					onChangeText={handleOnChange}
					textAlign='center'
				/>
				<TextInputWithLabel
					label='Name'
					placeholder='Artist name'
					onChangeText={handleOnChange}
				/>
				<PhoneNumberTextInputWithLabel
					label='Phone number'
					onChangeText={handleOnChange}
				/>
			</View>
		</DismissKeyboardWrapper>
	);
};

export default Inputs;
