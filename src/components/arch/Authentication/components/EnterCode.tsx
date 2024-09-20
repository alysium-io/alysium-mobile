import { View } from '@atomic';
import { regexPatterns } from '@etc';
import {
	Button,
	ButtonStateApi,
	DeclarativeText,
	TextInputWithLabel
} from '@molecules';
import { LoginUserPhoneNumberFormApi } from '@src/utils/redux-hook-form/useLoginUserPhoneNumber';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import ContentAnimationWrapper from './ContentAnimationWrapper';

interface EnterCodeWithPhoneBodyProps {
	onPressBack: () => void;
	loginUserPhoneNumberFormApi: LoginUserPhoneNumberFormApi;
	oneTimeCodeButtonStateApi: ButtonStateApi;
}

const EnterCodeWithPhoneBody: React.FC<EnterCodeWithPhoneBodyProps> = ({
	onPressBack,
	loginUserPhoneNumberFormApi,
	oneTimeCodeButtonStateApi
}) => {
	useEffect(() => {
		const newButtonState = regexPatterns.oneTimeCode.test(
			loginUserPhoneNumberFormApi.formMethods.watch('passcode')
		)
			? 'active'
			: 'disabled';
		oneTimeCodeButtonStateApi.setButtonState(newButtonState);
	}, [loginUserPhoneNumberFormApi.formMethods.watch('passcode')]);

	return (
		<ContentAnimationWrapper>
			<Controller
				control={loginUserPhoneNumberFormApi.formMethods.control}
				name='passcode'
				rules={{
					required: 'Please enter a code',
					pattern: {
						value: regexPatterns.oneTimeCode,
						message: 'Please enter a valid code'
					}
				}}
				render={({ field: { onChange } }) => (
					<TextInputWithLabel
						placeholder='Enter One Time Code'
						keyboardType='number-pad'
						textContentType='oneTimeCode'
						onChangeText={onChange}
					/>
				)}
			/>
			<View margin='m'>
				<DeclarativeText
					textItems={[
						{
							text: 'We texted you a code, enter it here.',
							variant: 'paragraph-small'
						}
					]}
				/>
			</View>
			<View padding='m' flexDirection='row'>
				<View flex={1} marginRight='s'>
					<Button text='Back' onPress={onPressBack} variant='outlined' />
				</View>
				<View flex={1} marginLeft='s'>
					<Button
						text='Log In'
						color='t'
						onPress={loginUserPhoneNumberFormApi.onSubmit}
						buttonState={oneTimeCodeButtonStateApi.buttonState}
					/>
				</View>
			</View>
		</ContentAnimationWrapper>
	);
};

export default EnterCodeWithPhoneBody;
