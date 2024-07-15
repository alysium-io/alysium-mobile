import { View } from '@atomic';
import { Button, DeclarativeText, TextInputWithLabel } from '@molecules';
import React from 'react';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContentAnimationWrapper from './ContentAnimationWrapper';

const EnterCodeWithPhoneBody = () => {
	const { loginPhoneNumber, setCode, resetState } =
		useAuthenticationAppContext();
	return (
		<ContentAnimationWrapper>
			<TextInputWithLabel
				placeholder='Enter One Time Code'
				keyboardType='number-pad'
				textContentType='oneTimeCode'
				onChangeText={(text: string) => setCode(text)}
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
					<Button text='Back' onPress={resetState} variant='outlined' />
				</View>
				<View flex={1} marginLeft='s'>
					<Button text='Log In' onPress={loginPhoneNumber} color='t' />
				</View>
			</View>
		</ContentAnimationWrapper>
	);
};

export default EnterCodeWithPhoneBody;
