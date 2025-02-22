import { Icon, Text, TextInput, View } from '@atomic';
import {
	TextInputFocusConfig,
	useMergedRef,
	useTextInputFocusEffect,
	useTheme
} from '@hooks';
import { Props } from '@types';
import React, { forwardRef, useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInput as RNTextInput,
	TextInputFocusEventData
} from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

interface TextBoxProps extends Props<typeof TextInput> {
	subtitle?: string | React.ReactNode;
	focusConfig?: TextInputFocusConfig;
}

const TextBox = forwardRef<RNTextInput, TextBoxProps>(
	(
		{ subtitle, value, onChangeText, onFocus, onBlur, focusConfig, ...props },
		forwardedRef
	) => {
		const { theme } = useTheme();
		const [isFocused, setIsFocused] = useState<boolean>(false);

		const ref = useMergedRef<RNTextInput>(forwardedRef);
		useTextInputFocusEffect(ref, focusConfig);

		const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsFocused(true);
			onFocus?.(e);
		};

		const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsFocused(false);
			onBlur?.(e);
		};

		return (
			<View>
				<View
					flexDirection='row'
					alignItems='center'
					style={{
						borderRadius: theme.borderRadii.m,
						backgroundColor: theme.colors['bg.light'],
						borderWidth: theme.borderWidth.xthick,
						borderColor: isFocused
							? theme.colors['border.heavy']
							: theme.colors['border.light']
					}}
				>
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
						style={{ flex: 1 }}
						{...props}
					/>
					{value && (
						<Pressable
							onPress={() => onChangeText?.('')}
							style={{ marginRight: theme.spacing.m }}
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
	}
);

export default TextBox;
