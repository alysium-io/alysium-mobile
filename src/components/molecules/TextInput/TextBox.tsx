import { Icon, Text, TextInput, View } from '@atomic';
import { useTheme } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';
import { Props } from '@types';
import React, { useCallback, useRef, useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInput as RNTextInput,
	TextInputFocusEventData
} from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

interface TextBoxProps extends Props<typeof TextInput> {
	focusOnMount?: boolean;
	subtitle?: string | React.ReactNode;
}

const TextBox: React.FC<TextBoxProps> = ({
	focusOnMount = false,
	subtitle,
	value,
	onChangeText,
	onFocus,
	onBlur,
	...props
}) => {
	const { theme } = useTheme();
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const ref = useRef<RNTextInput>(null);

	const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(true);
		onFocus?.(e);
	};

	const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(false);
		onBlur?.(e);
	};

	useFocusEffect(
		useCallback(() => {
			if (focusOnMount) {
				setTimeout(() => {
					setIsFocused(true);
					ref?.current?.focus();
				}, 300);
			}
		}, [])
	);

	return (
		<View>
			<View position='relative'>
				<TextInput
					ref={ref}
					variant='paragraph'
					placeholderTextColor={theme.colors['text.q']}
					color='text.p'
					multiline={false}
					padding='m'
					onFocus={_onFocus}
					onBlur={_onBlur}
					value={value}
					onChangeText={onChangeText}
					style={{
						borderRadius: theme.borderRadii.m,
						backgroundColor: theme.colors['bg.light'],
						borderWidth: theme.borderWidth.xthick,
						borderColor: isFocused
							? theme.colors['border.heavy']
							: theme.colors['border.light']
					}}
					{...props}
				/>
				{value && (
					<Pressable
						onPress={() => {
							onChangeText?.('');
						}}
						style={{
							position: 'absolute',
							right: theme.spacing.m,
							top: '50%',
							transform: [{ translateY: -9 }],
							zIndex: 9999
						}}
					>
						<Icon
							name='clear'
							size={18}
							color={isFocused ? 'border.heavy' : 'border.light'}
						/>
					</Pressable>
				)}
			</View>
			{typeof subtitle === 'string' ? (
				<Text
					variant='paragraph-small'
					color='text.q'
					marginTop='s'
					marginHorizontal='s'
				>
					{subtitle}
				</Text>
			) : (
				subtitle
			)}
		</View>
	);
};

export default TextBox;
