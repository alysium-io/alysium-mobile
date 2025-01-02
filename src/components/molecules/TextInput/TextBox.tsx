import { AView, Text, TextInput, View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface TextBoxProps extends Props<typeof TextInput> {
	subtitle?: string | React.ReactNode;
}

const TextBox = forwardRef<RNTextInput, TextBoxProps>(
	({ subtitle, ...props }, ref) => {
		const { theme } = useTheme();

		return (
			<View>
				<TouchableWithoutFeedback
					onPress={() => {
						if (ref && 'current' in ref) {
							ref.current?.focus();
						}
					}}
				>
					<AView
						backgroundColor='bg.light'
						padding='m'
						borderWidth={theme.borderWidth.normal}
						borderRadius='m'
						borderColor='border.medium'
					>
						<TextInput
							ref={ref}
							variant='paragraph'
							placeholderTextColor={theme.colors['text.q']}
							color='text.p'
							multiline
							{...props}
						/>
					</AView>
				</TouchableWithoutFeedback>
				{typeof subtitle === 'string' ? (
					<Text
						variant='paragraph-small'
						color='text.q'
						marginTop='s'
						marginHorizontal='s'
					>
						{subtitle}
					</Text>
				) : (
					subtitle
				)}
			</View>
		);
	}
);

export default TextBox;
