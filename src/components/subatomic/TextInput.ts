import {
	ColorProps,
	SpacingProps,
	VariantProps,
	color,
	createRestyleComponent,
	createVariant,
	spacing
} from '@shopify/restyle';
import { Props, Theme } from '@types';
import {
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps
} from 'react-native';
import Animated from 'react-native-reanimated';

const RNAnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

const textInputRestyleFunctions = [
	createVariant({ themeKey: 'textVariants' }),
	spacing,
	color
];

export type InanimateTextInputProps = SpacingProps<Theme> &
	VariantProps<Theme, 'textVariants'> &
	ColorProps<Theme> &
	RNTextInputProps;

export type AnimateTextInputProps = SpacingProps<Theme> &
	VariantProps<Theme, 'textVariants'> &
	ColorProps<Theme> &
	Props<typeof RNAnimatedTextInput>;

const InanimateTextInput = createRestyleComponent<
	InanimateTextInputProps,
	Theme
>(textInputRestyleFunctions, RNTextInput);

const AnimateTextInput = createRestyleComponent<AnimateTextInputProps, Theme>(
	textInputRestyleFunctions,
	RNAnimatedTextInput
);

export { AnimateTextInput, InanimateTextInput };
