import { PhoneNumberTextInput, Text, View } from '@atomic';
import { TextInputApi, useAnimatedState, useTextInput, useTheme } from '@hooks';
import React from 'react';
import {
	NativeSyntheticEvent,
	TextInputFocusEventData,
	TextInputProps
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

interface PhoneNumberTextInputWithLabelProps extends TextInputProps {
	textInputApi?: TextInputApi;
	textAlign?: 'left' | 'center';
	label?: string;
}

const PhoneNumberTextInputWithLabel: React.FC<
	PhoneNumberTextInputWithLabelProps
> = ({ textInputApi, label, ...props }) => {
	const { theme } = useTheme();
	const { animatedValue, off, on } = useAnimatedState();
	const activeBorderColor = theme.colors['border.heavy'];
	const inactiveBorderColor = theme.colors['border.medium'];
	const defaultTextInputApi = useTextInput();
	const _textInputApi = textInputApi || defaultTextInputApi;

	const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		off();
		props.onBlur && props.onBlur(e);
	};

	const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		on();
		props.onFocus && props.onFocus(e);
	};

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			borderColor: interpolateColor(
				animatedValue.value,
				[0, 1],
				[inactiveBorderColor, activeBorderColor]
			)
		};
	});

	return (
		<TouchableWithoutFeedback onPress={_textInputApi.focus}>
			<View
				animated
				paddingVertical='l'
				paddingHorizontal='s'
				borderBottomWidth={theme.borderWidth.thin}
				style={animatedContainerStyle}
			>
				{label && (
					<View style={{ marginBottom: 5 }}>
						<Text variant='paragraph-small' color='text.s' marginRight='m'>
							{label}
						</Text>
					</View>
				)}
				<View>
					<PhoneNumberTextInput
						ref={_textInputApi.ref}
						variant='paragraph'
						color='text.s'
						placeholderTextColor={theme.colors['text.q']}
						onFocus={_onFocus}
						onBlur={_onBlur}
						{...props}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default PhoneNumberTextInputWithLabel;
