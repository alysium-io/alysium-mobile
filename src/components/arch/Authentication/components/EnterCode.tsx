import { View } from '@atomic';
import { regexPatterns } from '@etc';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import {
	Button,
	ButtonStateApi,
	DeclarativeText,
	TextInputWithLabel
} from '@molecules';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface EnterCodeWithPhoneBodyProps {
	onPressBack: () => void;
	oneTimeCodeButtonStateApi: ButtonStateApi;
	control: Control<LoginUserPhoneNumberBodyDto>;
	onSubmit: () => void;
}

const EnterCodeWithPhoneBody: React.FC<EnterCodeWithPhoneBodyProps> = ({
	onPressBack,
	control,
	oneTimeCodeButtonStateApi,
	onSubmit
}) => {
	return (
		<View>
			<Controller
				control={control}
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
						onPress={onSubmit}
						buttonState={oneTimeCodeButtonStateApi.buttonState}
					/>
				</View>
			</View>
		</View>
	);
};

export default EnterCodeWithPhoneBody;
