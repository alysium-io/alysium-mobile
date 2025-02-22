import { DismissKeyboardWrapper, View } from '@atomic';
import { regexPatterns } from '@etc';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import { useSheet } from '@hooks';
import {
	Button,
	ButtonStateApi,
	DeclarativeText,
	InternationalPhoneNumberTextInput
} from '@molecules';
import { PrivacyPolicyBottomSheet } from '@popups';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Keyboard } from 'react-native';
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
	const sheetApi = useSheet();

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
								newline: false,
								onPress: () => {
									Keyboard.dismiss();
									sheetApi.open();
								}
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
			<DismissKeyboardWrapper containerStyle={{ flex: 1 }} />
			<View marginBottom='m'>
				<Button
					text='Continue as Guest'
					variant='outlined'
					onPress={loginGuest}
				/>
			</View>
			<PrivacyPolicyBottomSheet sheetApi={sheetApi} />
		</View>
	);
};

export default RegisterUserPhoneNumber;
