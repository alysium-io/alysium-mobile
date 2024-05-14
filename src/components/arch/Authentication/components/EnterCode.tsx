import { View } from '@atomic';
import { useTextInput } from '@hooks';
import { DeclarativeText, TextInput } from '@molecules';
import React from 'react';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContentAnimationWrapper from './ContentAnimationWrapper';

const EnterCodeWithPhoneBody = () => {
	const textInputApi = useTextInput();
	const { setCode } = useAuthenticationAppContext();
	return (
		<ContentAnimationWrapper>
			<TextInput
				placeholder='Enter One Time Code'
				keyboardType='number-pad'
				textContentType='oneTimeCode'
				textInputApi={textInputApi}
				onChangeText={(text) => setCode(text)}
				icon='phone'
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
		</ContentAnimationWrapper>
	);
};

export default EnterCodeWithPhoneBody;
