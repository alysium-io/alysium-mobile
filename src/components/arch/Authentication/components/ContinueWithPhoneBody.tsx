import { View } from '@atomic';
import { useTextInput } from '@hooks';
import {
	Button,
	DeclarativeText,
	InternationalPhoneNumberTextInput
} from '@molecules';
import React from 'react';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContentAnimationWrapper from './ContentAnimationWrapper';

const ContinueWithPhoneBody = () => {
	const textInputApi = useTextInput();
	const { continuePhoneNumber, setPhoneNumber, state } =
		useAuthenticationAppContext();

	return (
		<ContentAnimationWrapper>
			<InternationalPhoneNumberTextInput
				textInputApi={textInputApi}
				onChangeText={(text: string) => setPhoneNumber(text)}
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
			<View marginVertical='m'>
				<Button
					text='Send Text'
					onPress={continuePhoneNumber}
					color='p'
					buttonState={state.isLoading ? 'loading' : 'active'}
				/>
			</View>
		</ContentAnimationWrapper>
	);
};

export default ContinueWithPhoneBody;
