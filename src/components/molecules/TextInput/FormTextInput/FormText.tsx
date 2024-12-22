import { TextInput, View } from '@atomic';
import { TextInputApi, useTheme } from '@hooks';
import { Props } from '@types';
import React, { useEffect, useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import ClearButton from './components/ClearButton';
import Container from './components/Container';
import Label from './components/Label';

type FormTextProps = Props<typeof TextInput> & {
	label: string;
	textInputApi?: TextInputApi;
	focusOnMount?: boolean;
	focusOnMountDelay?: number;
	onPressClear?: () => void;
};

const FormText: React.FC<FormTextProps> = ({
	label,
	textInputApi,
	defaultValue,
	editable,
	focusOnMount = false,
	focusOnMountDelay = 300,
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
};

export default FormText;
