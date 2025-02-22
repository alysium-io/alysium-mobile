import TermsOfServiceAgreement from '@arch/Authentication/components/TermsOfServiceAgreement';
import { LView, View } from '@atomic';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import { ActionButtons, ButtonStateApi, TextInputWithLabel } from '@molecules';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FadeInRight, FadeOutRight } from 'react-native-reanimated';

interface EnterCodeProps {
	control: Control<LoginUserPhoneNumberBodyDto>;
	onPressBack: () => void;
	onSubmitLogin: () => void;
	oneTimeCodeButtonStateApi: ButtonStateApi;
}

const EnterCode: React.FC<EnterCodeProps> = ({
	control,
	onPressBack,
	onSubmitLogin,
	oneTimeCodeButtonStateApi
}) => {
	return (
		<LView entering={FadeInRight} exiting={FadeOutRight}>
			<Controller
				name='passcode'
				control={control}
				rules={{
					required: 'Please enter a code',
					minLength: {
						value: 6,
						message: 'Please enter a valid code'
					}
				}}
				render={({ field: { onChange, value } }) => (
					<TextInputWithLabel
						placeholder='Enter One Time Code'
						keyboardType='number-pad'
						textContentType='oneTimeCode'
						onChangeText={onChange}
						value={value}
						autoFocus
					/>
				)}
			/>
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
			</View>
			<ActionButtons
				buttonProps={[
					{
						text: 'Back',
						variant: 'outlined',
						onPress: onPressBack
					},
					{
						text: 'Login',
						color: 'p',
						onPress: onSubmitLogin,
						buttonState: oneTimeCodeButtonStateApi.buttonState
					}
				]}
			/>
		</LView>
	);
};

export default EnterCode;
