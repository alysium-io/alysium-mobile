import { View } from '@atomic';
import { regexPatterns } from '@etc';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import {
	Button,
	ButtonStateApi,
	DeclarativeText,
	InternationalPhoneNumberTextInput
} from '@molecules';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useAuthenticationAppContext } from '../Authentication.context';

interface RegisterUserPhoneNumberProps {
	control: Control<RegisterUserPhoneNumberBodyDto>;
	onSubmit: () => void;
	sendTextButtonStateApi: ButtonStateApi;
}

const RegisterUserPhoneNumber: React.FC<RegisterUserPhoneNumberProps> = ({
	control,
	sendTextButtonStateApi,
	onSubmit
}) => {
	const { loginGuest } = useAuthenticationAppContext();

	return (
		<View flex={1} justifyContent='space-between'>
			<View>
				<Controller
					control={control}
					name='phone_number'
					rules={{
						required: 'Please enter a phone number',
						pattern: {
							value: regexPatterns.phoneNumber,
							message: 'Please enter a valid phone number'
						}
					}}
					render={({ field: { onChange } }) => (
						<InternationalPhoneNumberTextInput
							onChangeText={onChange}
							focusConfig={{ useFocusEffect: false }}
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
				<View marginVertical='m'>
					<Button
						text='Send Text'
						onPress={onSubmit}
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
	);
};

export default RegisterUserPhoneNumber;
