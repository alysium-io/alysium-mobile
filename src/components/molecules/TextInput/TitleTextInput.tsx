import { AView, TextInput } from '@atomic';
import { useAnimatedState, useTheme } from '@hooks';
import { IconNames } from '@svg';
import React, { useRef } from 'react';
import {
	NativeSyntheticEvent,
	TextInput as RNTextInput,
	TextInputFocusEventData,
	TextInputProps,
	TouchableWithoutFeedback
} from 'react-native';
import { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

interface TitleTextInputProps extends TextInputProps {
	textAlign?: 'left' | 'center';
	icon?: IconNames;
}

const TitleTextInput: React.FC<TitleTextInputProps> = ({
	textAlign = 'center',
	icon,
	...props
}) => {
	const { theme } = useTheme();
	const ref = useRef<RNTextInput>(null);
	const { animatedValue, off, on } = useAnimatedState();
	const activeColor = theme.colors['text.p'];
	const inactiveColor = theme.colors['text.q'];

	const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		off();
		props.onBlur && props.onBlur(e);
	};

	const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		on();
		props.onFocus && props.onFocus(e);
	};

	const animatedBorderStyle = useAnimatedStyle(() => {
		return {
			borderBottomColor: interpolateColor(
				animatedValue.value,
				[0, 1],
				[inactiveColor, activeColor]
			)
		};
	}, []);

	return (
		<TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
			<AView
				paddingVertical='s'
				flexDirection='row'
				alignItems='center'
				borderBottomWidth={theme.borderWidth.thick}
				style={animatedBorderStyle}
			>
				<TextInput
					ref={ref}
					placeholderTextColor={theme.colors['text.q']}
					variant='page-header'
					onFocus={_onFocus}
					onBlur={_onBlur}
					textAlign={textAlign}
					color='text.p'
					style={{ flex: 1 }}
					{...props}
				/>
			</AView>
		</TouchableWithoutFeedback>
	);
};

export default TitleTextInput;
