import { TextInput, View } from '@atomic';
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

type FormTextProps = Props<typeof TextInput> & {
	label: string;
	focusConfig?: TextInputFocusConfig;
	onPressClear?: () => void;
};

const FormText = forwardRef<RNTextInput, FormTextProps>(
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
						color='text.p'
						placeholderTextColor={theme.colors['text.q']}
						scrollEnabled={false}
						multiline
						style={{
							padding: 0
						}}
						{...props}
					/>
				</View>
				{onPressClear && <ClearButton onPress={onPressClear} />}
			</Container>
		);
	}
);

export default FormText;
