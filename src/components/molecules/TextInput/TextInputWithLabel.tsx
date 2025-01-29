import { AView, Text, TextInput, View } from '@atomic';
import {
	TextInputFocusConfig,
	useMergedRef,
	useTextInputFocusEffect,
	useTheme
} from '@hooks';
import React, { forwardRef, useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInput as RNTextInput,
	TextInputFocusEventData,
	TextInputProps
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface TextInputWithLabelProps extends TextInputProps {
	textAlign?: 'left' | 'center';
	label?: string;
	focusConfig?: TextInputFocusConfig;
}

const TextInputWithLabel = forwardRef<RNTextInput, TextInputWithLabelProps>(
	({ label, focusConfig, ...props }, forwardedRef) => {
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
					paddingVertical='l'
					paddingHorizontal='s'
					borderBottomWidth={theme.borderWidth.thin}
					borderColor={isActive ? 'border.heavy' : 'border.medium'}
				>
					{label && (
						<View style={{ marginBottom: 5 }}>
							<Text variant='paragraph-small' color='text.s' marginRight='m'>
								{label}
							</Text>
						</View>
					)}
					<View>
						<TextInput
							ref={ref}
							variant='paragraph'
							color='text.s'
							placeholderTextColor={theme.colors['text.q']}
							onFocus={_onFocus}
							onBlur={_onBlur}
							{...props}
						/>
					</View>
				</AView>
			</TouchableWithoutFeedback>
		);
	}
);

export default TextInputWithLabel;
