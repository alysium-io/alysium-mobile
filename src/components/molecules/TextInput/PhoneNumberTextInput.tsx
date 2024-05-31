import { TextInput as RNTextInput, Text, View } from '@atomic';
import { Formatting } from '@etc';
import { TextInputApi, useTheme } from '@hooks';
import React, { useEffect } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface PhoneNumberTextInputProps extends TextInputProps {
	textInputApi: TextInputApi;
	defaultValue?: string;
	placeholder: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
	textAlign?: 'left' | 'center';
	containerProps?: React.ComponentProps<typeof View>;
	value?: string;
	color?: string;
}

const PhoneNumberTextInput: React.FC<PhoneNumberTextInputProps> = ({
	textInputApi,
	defaultValue,
	placeholder,
	onChangeText,
	onFocus,
	onBlur,
	containerProps,
	value,
	color,
	...props
}) => {
	const { theme } = useTheme();
	const borderColor = useSharedValue<string>(theme.colors.ion_dark);

	useEffect(() => {
		borderColor.value = withTiming(color || theme.colors.ion_dark);
	}, [color]);

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			borderColor: borderColor.value
		};
	});

	const _onFocus = () => {
		borderColor.value = withTiming(theme.colors.t1);
		onFocus && onFocus();
	};

	const _onBlur = () => {
		borderColor.value = withTiming(theme.colors.ion_dark);
		onBlur && onBlur();
	};

	return (
		<TouchableWithoutFeedback onPress={() => textInputApi.focus()}>
			<View
				animated
				style={[
					styles.container,
					{
						backgroundColor: theme.colors.bg2
					},
					animatedContainerStyle
				]}
				{...containerProps}
			>
				<View flexDirection='row' width='100%'>
					<View padding='m' height='100%' backgroundColor='t1'>
						<Text variant='paragraph-medium' color='bg2'>
							+1
						</Text>
					</View>
					<View flex={1} padding='m'>
						<RNTextInput
							ref={textInputApi.ref}
							defaultValue={defaultValue}
							placeholder={placeholder}
							onChangeText={onChangeText}
							onFocus={_onFocus}
							onBlur={_onBlur}
							value={value ? Formatting.formatPhoneNumber(value) : value}
							variant='paragraph-medium'
							placeholderTextColor={theme.colors.t3}
							style={{ color: theme.colors.t1 }}
							{...props}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 0.5,
		borderRadius: 8,
		overflow: 'hidden'
	}
});

export default PhoneNumberTextInput;
