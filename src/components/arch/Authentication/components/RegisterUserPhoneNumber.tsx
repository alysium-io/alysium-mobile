import { View } from '@atomic';
import { regexPatterns } from '@etc';
import {
	Button,
	ButtonStateApi,
	DeclarativeText,
	InternationalPhoneNumberTextInput
} from '@molecules';
import { RegisterUserPhoneNumberFormApi } from '@src/utils/redux-hook-form/useRegisterUserPhoneNumber';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContentAnimationWrapper from './ContentAnimationWrapper';

interface RegisterUserPhoneNumberProps {
	registerUserPhoneNumberFormApi: RegisterUserPhoneNumberFormApi;
	sendTextButtonStateApi: ButtonStateApi;
}

const RegisterUserPhoneNumber: React.FC<RegisterUserPhoneNumberProps> = ({
	registerUserPhoneNumberFormApi,
	sendTextButtonStateApi
}) => {
	const { loginGuest } = useAuthenticationAppContext();

	useEffect(() => {
		const newButtonState = regexPatterns.phoneNumber.test(
			registerUserPhoneNumberFormApi.formMethods.watch('phone_number')
		)
			? 'active'
			: 'disabled';
		sendTextButtonStateApi.setButtonState(newButtonState);
	}, [registerUserPhoneNumberFormApi.formMethods.watch('phone_number')]);

	return (
		<ContentAnimationWrapper>
			<View flex={1} justifyContent='space-between'>
				<View>
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
						render={({ field: { onChange } }) => (
							<InternationalPhoneNumberTextInput onChangeText={onChange} />
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
					<View marginVertical='m'>
						<Button
							text='Send Text'
							onPress={registerUserPhoneNumberFormApi.onSubmit}
							color='p'
							buttonState={sendTextButtonStateApi.buttonState}
						/>
					</View>
				</View>
				<View marginBottom='m'>
					<Button
						text='Continue as Guest'
						variant='outlined'
						onPress={loginGuest}
					/>
				</View>
			</View>
		</ContentAnimationWrapper>
	);
};

export default RegisterUserPhoneNumber;
