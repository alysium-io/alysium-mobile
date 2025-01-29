import { LView, View } from '@atomic';
import { regexPatterns } from '@etc';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import { DeclarativeText, InternationalPhoneNumberTextInput } from '@molecules';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface InputPhoneNumberProps {
	control: Control<RegisterUserPhoneNumberBodyDto>;
}

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({ control }) => {
	return (
		<LView entering={FadeInRight} exiting={FadeOutLeft}>
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
							newline: false
						}
					]}
				/>
			</View>
		</LView>
	);
};

export default InputPhoneNumber;
