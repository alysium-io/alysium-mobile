import { PhoneNumberTextInput, TextInput, View } from '@atomic';
import {
	TextInputFocusConfig,
	useMergedRef,
	useTextInputFocusEffect,
	useTheme
} from '@hooks';
import { Props } from '@types';
import React, { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import ClearButton from './components/ClearButton';
import Container from './components/Container';
import Label from './components/Label';

type FormPhoneNumberProps = Props<typeof PhoneNumberTextInput> & {
	label: string;
	focusConfig?: TextInputFocusConfig;
	onPressClear?: () => void;
};

const FormPhoneNumber = forwardRef<RNTextInput, FormPhoneNumberProps>(
	({ label, focusConfig, onPressClear, ...props }, forwardedRef) => {
		const { theme } = useTheme();

		const ref = useMergedRef<RNTextInput>(forwardedRef);
		useTextInputFocusEffect(ref, focusConfig);

		return (
			<Container onPress={() => ref.current?.focus()}>
				<Label>{label}</Label>
				<View flex={1}>
					<TextInput
						ref={ref}
						variant='paragraph'
						placeholderTextColor={theme.colors['text.q']}
						textContentType='telephoneNumber'
						keyboardType='phone-pad'
						inputMode='tel'
						placeholder='(123) 456-7890'
						color='text.p'
						{...props}
						maxLength={14}
					/>
				</View>
				{onPressClear && <ClearButton onPress={onPressClear} />}
			</Container>
		);
	}
);

export default FormPhoneNumber;
