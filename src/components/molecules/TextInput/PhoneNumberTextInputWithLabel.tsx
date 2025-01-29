import { AView, PhoneNumberTextInput, Text, View } from '@atomic';
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
	TextInputChangeEventData,
	TextInputProps
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface PhoneNumberTextInputWithLabelProps extends TextInputProps {
	textAlign?: 'left' | 'center';
	label?: string;
	focusConfig?: TextInputFocusConfig;
}

const PhoneNumberTextInputWithLabel = forwardRef<
	RNTextInput,
	PhoneNumberTextInputWithLabelProps
>(({ label, focusConfig, ...props }, forwardedRef) => {
	const { theme } = useTheme();
	const [isActive, setIsActive] = useState(false);

	const ref = useMergedRef<RNTextInput>(forwardedRef);
	useTextInputFocusEffect(ref, focusConfig);

	const _onFocus = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setIsActive(true);
		props.onFocus && props.onFocus(e);
	};

	const _onBlur = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setIsActive(false);
		props.onBlur && props.onBlur(e);
	};

	return (
		<TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
			<AView
				paddingVertical='l'
				paddingHorizontal='s'
				borderBottomWidth={theme.borderWidth.thin}
				borderBottomColor={
					isActive
						? theme.colors['border.heavy']
						: theme.colors['border.medium']
				}
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
});

export default PhoneNumberTextInputWithLabel;
