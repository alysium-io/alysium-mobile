import { LView, View } from '@atomic';
import { regexPatterns } from '@etc';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import { useSheet } from '@hooks';
import {
	ActionButtons,
	ButtonStateApi,
	DeclarativeText,
	InternationalPhoneNumberTextInput
} from '@molecules';
import { PrivacyPolicyBottomSheet } from '@popups';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';

interface InputPhoneNumberProps {
	control: Control<RegisterUserPhoneNumberBodyDto>;
	sendTextButtonStateApi: ButtonStateApi;
	onPressCancel: () => void;
	onSubmitRegister: () => void;
}

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
	control,
	sendTextButtonStateApi,
	onPressCancel,
	onSubmitRegister
}) => {
	const sheetApi = useSheet();
	return (
		<LView entering={FadeInLeft} exiting={FadeOutLeft}>
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
				render={({ field }) => (
					<InternationalPhoneNumberTextInput
						focusConfig={{ focusOnMount: true }}
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
							newline: false,
							onPress: () => {
								Keyboard.dismiss();
								sheetApi.open();
							}
						}
					]}
				/>
			</View>
			<ActionButtons
				buttonProps={[
					{
						text: 'cancel',
						variant: 'outlined',
						onPress: onPressCancel
					},
					{
						text: 'Send Text',
						color: 'p',
						onPress: onSubmitRegister,
						buttonState: sendTextButtonStateApi.buttonState
					}
				]}
			/>
			<PrivacyPolicyBottomSheet sheetApi={sheetApi} />
		</LView>
	);
};

export default InputPhoneNumber;
