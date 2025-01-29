import { AView, TextInput } from '@atomic';
import {
	TextInputFocusConfig,
	useMergedRef,
	useTextInputFocusEffect,
	useTheme
} from '@hooks';
import { IconNames } from '@svg';
import React, { forwardRef, useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInput as RNTextInput,
	TextInputFocusEventData,
	TextInputProps,
	TouchableWithoutFeedback
} from 'react-native';

interface TitleTextInputProps extends TextInputProps {
	textAlign?: 'left' | 'center';
	icon?: IconNames;
	focusConfig?: TextInputFocusConfig;
}

const TitleTextInput = forwardRef<RNTextInput, TitleTextInputProps>(
	({ textAlign = 'center', icon, focusConfig, ...props }, forwardedRef) => {
		const { theme } = useTheme();
		const [isActive, setIsActive] = useState(false);

		const ref = useMergedRef<RNTextInput>(forwardedRef);
		useTextInputFocusEffect(ref, focusConfig);

		const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsActive(false);
			props.onBlur && props.onBlur(e);
		};

		const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsActive(true);
			props.onFocus && props.onFocus(e);
		};

		return (
			<TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
				<AView
					paddingVertical='s'
					flexDirection='row'
					alignItems='center'
					borderBottomWidth={theme.borderWidth.thick}
					borderColor={isActive ? 'border.heavy' : 'border.medium'}
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
	}
);

export default TitleTextInput;
