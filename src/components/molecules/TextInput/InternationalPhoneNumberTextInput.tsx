import {
	PhoneNumberTextInput as AtomicPhoneNumberTextInput,
	PhoneNumberTextInputProps,
	Text,
	View
} from '@atomic';
import { TextInputApi, useTextInput, useTheme } from '@hooks';
import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface InternationalPhoneNumberTextInputProps
	extends PhoneNumberTextInputProps {
	textInputApi?: TextInputApi;
	textAlign?: 'left' | 'center';
}

const InternationalPhoneNumberTextInput: React.FC<
	InternationalPhoneNumberTextInputProps
> = ({ textInputApi, textAlign, ...props }) => {
	const { theme } = useTheme();
	const animatedValue = useSharedValue<number>(0);
	const activeBorderColor = theme.colors['text.p'];
	const inactiveBorderColor = theme.colors['transparent'];

	const defaultTextInputApi = useTextInput();
	const _textInputApi = textInputApi || defaultTextInputApi;

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			borderColor: interpolateColor(
				animatedValue.value,
				[0, 1],
				[inactiveBorderColor, activeBorderColor]
			)
		};
	});

	const _onFocus = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		animatedValue.value = withTiming(1);
		props.onFocus && props.onFocus(e);
	};

	const _onBlur = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		animatedValue.value = withTiming(0);
		props.onBlur && props.onBlur(e);
	};

	return (
		<TouchableWithoutFeedback onPress={_textInputApi?.focus}>
			<View
				animated
				backgroundColor='bg.s'
				borderWidth={theme.borderWidth.thick}
				borderRadius='m'
				overflow='hidden'
				style={animatedContainerStyle}
			>
				<View flexDirection='row'>
					<View padding='m' height='100%' backgroundColor='bg.negative.p'>
						<Text variant='paragraph-medium' color='text.negative.p'>
							+1
						</Text>
					</View>
					<View flex={1} padding='m' justifyContent='center'>
						<AtomicPhoneNumberTextInput
							ref={_textInputApi.ref}
							onFocus={_onFocus}
							onBlur={_onBlur}
							{...props}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default InternationalPhoneNumberTextInput;
