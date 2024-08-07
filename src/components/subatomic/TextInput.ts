import {
	ColorProps,
	SpacingProps,
	VariantProps,
	color,
	createRestyleComponent,
	createVariant,
	spacing
} from '@shopify/restyle';
import { Theme } from '@types';
import {
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps
} from 'react-native';

const textInputRestyleFunctions = [
	createVariant({ themeKey: 'textVariants' }),
	spacing,
	color
];

export type InanimateTextInputProps = SpacingProps<Theme> &
	VariantProps<Theme, 'textVariants'> &
	ColorProps<Theme> &
	RNTextInputProps;

const InanimateTextInput = createRestyleComponent<
	InanimateTextInputProps,
	Theme
>(textInputRestyleFunctions, RNTextInput);

export { InanimateTextInput };
