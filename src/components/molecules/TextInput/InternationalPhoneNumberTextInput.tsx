import {
	PhoneNumberTextInput as AtomicPhoneNumberTextInput,
	Icon,
	PhoneNumberTextInputProps,
	View
} from '@atomic';
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
	TextInputChangeEventData
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface InternationalPhoneNumberTextInputProps
	extends PhoneNumberTextInputProps {
	textAlign?: 'left' | 'center';
	focusConfig?: TextInputFocusConfig;
}
const InternationalPhoneNumberTextInput = forwardRef<
	RNTextInput,
	InternationalPhoneNumberTextInputProps
>(({ textAlign, focusConfig, ...props }, forwardedRef) => {
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
			<View
				backgroundColor='bg.light'
				borderWidth={theme.borderWidth.xthick}
				borderRadius='m'
				overflow='hidden'
				borderColor={isActive ? 'bg.negative.p' : 'border.light'}
			>
				<View flexDirection='row'>
					<View padding='m' height='100%' backgroundColor='bg.negative.p'>
						<Icon name='old-phone' size='m' color='text.negative.p' />
					</View>
					<View flex={1} padding='m' justifyContent='center'>
						<AtomicPhoneNumberTextInput
							ref={ref}
							onFocus={_onFocus}
							onBlur={_onBlur}
							maxLength={14}
							{...props}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
});

export default InternationalPhoneNumberTextInput;
