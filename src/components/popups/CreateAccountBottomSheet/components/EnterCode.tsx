import { View } from '@atomic';
import { TextInputApi } from '@hooks';
import { DeclarativeText, TextInputWithLabel } from '@molecules';
import { LoginUserPhoneNumberFormApi } from '@src/utils/redux-hook-form/useLoginUserPhoneNumberFormApi';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FadeInRight, FadeOutRight } from 'react-native-reanimated';

interface EnterCodeProps {
	loginUserPhoneNumberFormApi: LoginUserPhoneNumberFormApi;
	textInputApi: TextInputApi;
}

const EnterCode: React.FC<EnterCodeProps> = ({
	loginUserPhoneNumberFormApi,
	textInputApi
}) => {
	return (
		<View animated entering={FadeInRight} exiting={FadeOutRight}>
			<Controller
				name='passcode'
				control={loginUserPhoneNumberFormApi.formMethods.control}
				render={({ field: { onChange } }) => (
					<TextInputWithLabel
						textInputApi={textInputApi}
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
		</View>
	);
};

export default EnterCode;
