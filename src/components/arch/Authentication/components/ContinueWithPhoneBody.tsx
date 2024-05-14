import { View } from '@atomic';
import { useTextInput } from '@hooks';
import { DeclarativeText, PhoneNumberTextInput } from '@molecules';
import React from 'react';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContentAnimationWrapper from './ContentAnimationWrapper';

const ContinueWithPhoneBody = () => {
	const textInputApi = useTextInput();
	const { setPhoneNumber, state } = useAuthenticationAppContext();
	return (
		<ContentAnimationWrapper>
			<PhoneNumberTextInput
				placeholder='(630) 666-8677'
				value={state.phone_number}
				keyboardType='phone-pad'
				textContentType='telephoneNumber'
				textInputApi={textInputApi}
				onChangeText={(text) => setPhoneNumber(text)}
				maxLength={14}
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
							color: 'matt_light',
							underline: true,
							newline: false
						}
					]}
				/>
			</View>
		</ContentAnimationWrapper>
	);
};

export default ContinueWithPhoneBody;
