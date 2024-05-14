import { Icon, TextInput as RNTextInput, View } from '@atomic';
import { TextInputApi, useTheme } from '@hooks';
import { IconNames } from '@svg';
import React, { useEffect } from 'react';
import { TextInputProps as RNTextInputProps, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface TextInputProps extends RNTextInputProps {
	textInputApi: TextInputApi;
	defaultValue?: string;
	placeholder: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
	textAlign?: 'left' | 'center';
	containerProps?: React.ComponentProps<typeof View>;
	icon?: IconNames;
	value?: string;
	color?: string;
}

const TextInput: React.FC<TextInputProps> = ({
	textInputApi,
	defaultValue,
	placeholder,
	onChangeText,
	onFocus,
	onBlur,
	containerProps,
	icon,
	value,
	color,
	...props
}) => {
	useEffect(() => {
		borderColor.value = withTiming(color || theme.colors.ion);
	}, [color]);

	const { theme } = useTheme();

	const borderColor = useSharedValue<string>(theme.colors.ion);

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			borderColor: borderColor.value
		};
	});

	const _onFocus = () => {
		borderColor.value = withTiming(theme.colors.ion_dark);
		onFocus && onFocus();
	};

	const _onBlur = () => {
		borderColor.value = withTiming(theme.colors.ion);
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
				<View padding='m' flexDirection='row' alignItems='center'>
					{icon && (
						<View marginRight='s'>
							<Icon name={icon} size='regular' color='ion' />
						</View>
					)}
					<View flex={1}>
						<RNTextInput
							ref={textInputApi.ref}
							defaultValue={defaultValue}
							placeholder={placeholder}
							onChangeText={onChangeText}
							onFocus={_onFocus}
							onBlur={_onBlur}
							value={value}
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
		borderRadius: 8
	}
});

export default TextInput;
