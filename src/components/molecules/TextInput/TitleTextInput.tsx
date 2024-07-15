import { TextInput, View } from '@atomic';
import { useAnimatedState, useTextInput, useTheme } from '@hooks';
import { IconNames } from '@svg';
import React from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
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
	textAlign = 'left',
	icon,
	...props
}) => {
	const { theme } = useTheme();
	const { ref, focus } = useTextInput();
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
	});

	return (
		<TouchableWithoutFeedback onPress={focus}>
			<View
				animated
				marginHorizontal='xs'
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
					keyboardAppearance={theme.colors['etc.keyboard']}
					textAlign={textAlign}
					color='text.p'
					style={{ flex: 1 }}
					{...props}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});

export default TitleTextInput;
