import { LView, View } from '@atomic';
import { regexPatterns } from '@etc';
import { TextInputApi } from '@hooks';
import { DeclarativeText, InternationalPhoneNumberTextInput } from '@molecules';
import { RegisterUserPhoneNumberFormApi } from '@src/utils/redux-hook-form/useRegisterUserPhoneNumberFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FadeOutLeft } from 'react-native-reanimated';

interface InputPhoneNumberProps {
	registerUserPhoneNumberFormApi: RegisterUserPhoneNumberFormApi;
	textInputApi: TextInputApi;
}

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
	registerUserPhoneNumberFormApi,
	textInputApi
}) => {
	return (
		<LView exiting={FadeOutLeft}>
			<Controller
				control={registerUserPhoneNumberFormApi.formMethods.control}
				name='phone_number'
				rules={{
					required: 'Please enter a phone number',
					pattern: {
						value: regexPatterns.phoneNumber,
						message: 'Please enter a valid phone number'
					}
				}}
				render={({ field }) => (
					<InternationalPhoneNumberTextInput
						textInputApi={textInputApi}
						onChangeText={field.onChange}
					/>
				)}
			/>
			<View margin='m'>
				<DeclarativeText
					textItems={[
						{
							text: 'We will only ever use your phone number to log you in. See our ',
							variant: 'paragraph-small'
						},
						{
							text: 'Privacy Policy',
							variant: 'paragraph-small',
							color: 'subtext.s',
							underline: true,
							newline: false
						}
					]}
				/>
			</View>
		</LView>
	);
};

export default InputPhoneNumber;
