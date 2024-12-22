import { PhoneNumberTextInput, TextInput, View } from '@atomic';
import { TextInputApi, useTheme } from '@hooks';
import { Props } from '@types';
import React, { useEffect, useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import ClearButton from './components/ClearButton';
import Container from './components/Container';
import Label from './components/Label';

type FormPhoneNumberProps = Props<typeof PhoneNumberTextInput> & {
	label: string;
	textInputApi?: TextInputApi;
	focusOnMount?: boolean;
	focusOnMountDelay?: number;
	onPressClear?: () => void;
};

const FormPhoneNumber: React.FC<FormPhoneNumberProps> = ({
	label,
	textInputApi,
	defaultValue,
	focusOnMount,
	focusOnMountDelay,
	onPressClear,
	...props
}) => {
	const { theme } = useTheme();
	const ref = useRef<RNTextInput>(null);

	useEffect(() => {
		if (focusOnMount) {
			if (focusOnMountDelay) {
				setTimeout(() => {
					ref.current?.focus();
				}, focusOnMountDelay);
			} else {
				ref.current?.focus();
			}
		}
	}, []);

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
};

export default FormPhoneNumber;
