import { LView, View } from '@atomic';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import { DeclarativeText, TextInputWithLabel } from '@molecules';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FadeInRight, FadeOutRight } from 'react-native-reanimated';

interface EnterCodeProps {
	control: Control<LoginUserPhoneNumberBodyDto>;
}

const EnterCode: React.FC<EnterCodeProps> = ({ control }) => {
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
		</LView>
	);
};

export default EnterCode;
