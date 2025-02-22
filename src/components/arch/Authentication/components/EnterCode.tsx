import { Separator, View } from '@atomic';
import { regexPatterns } from '@etc';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import { Button, ButtonStateApi, TextInputWithLabel } from '@molecules';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import TermsOfServiceAgreement from './TermsOfServiceAgreement';

interface EnterCodeWithPhoneBodyProps {
	onPressBack: () => void;
	oneTimeCodeButtonStateApi: ButtonStateApi;
	control: Control<LoginUserPhoneNumberBodyDto>;
	onSubmit: () => void;
	previouslyAcceptedTerms: boolean;
}

const EnterCodeWithPhoneBody: React.FC<EnterCodeWithPhoneBodyProps> = ({
	onPressBack,
	control,
	oneTimeCodeButtonStateApi,
	onSubmit,
	previouslyAcceptedTerms
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
						autoFocus
					/>
				)}
			/>
			{!previouslyAcceptedTerms && (
				<View marginVertical='xl'>
					<Controller
						control={control}
						name='has_accepted_terms'
						rules={{
							required: 'You must accept the terms and conditions'
						}}
						render={({ field: { value, onChange } }) => (
							<TermsOfServiceAgreement
								checked={value}
								onPress={() => onChange(!value)}
							/>
						)}
					/>
					<Separator width='50%' alignSelf='center' marginVertical='l' />
				</View>
			)}
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
