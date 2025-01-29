import { DismissKeyboardWrapper, Text, View } from '@atomic';
import { TextBox } from '@molecules';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SimplifiedTextInput = () => {
	const insets = useSafeAreaInsets();
	const [value, setValue] = useState('');

	return (
		<View style={{ flex: 1, paddingTop: insets.top }} backgroundColor='bg.p'>
			<DismissKeyboardWrapper>
				<View margin='m' flex={1}>
					<Text>Hello World</Text>
					<View margin='m'>
						<TextBox
							focusConfig={{ focusOnMount: true }}
							placeholder='Hello World'
							value={value}
							onChangeText={setValue}
						/>
					</View>
					<View margin='m'>
						<TextBox
							placeholder='Hello World 2'
							defaultValue='Check this out'
							subtitle='This is a super sick subtitle'
						/>
					</View>
				</View>
			</DismissKeyboardWrapper>
		</View>
	);
};

export default SimplifiedTextInput;
