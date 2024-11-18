import {
	BackgroundColorProps,
	BorderProps,
	LayoutProps,
	TextProps as RestyleTextProps,
	SpacingProps,
	backgroundColor,
	border,
	color,
	createRestyleComponent,
	createText,
	createVariant,
	layout,
	spacing
} from '@shopify/restyle';
import { Props, Theme } from '@types';
import { Text as RNText } from 'react-native';
import Animated from 'react-native-reanimated';

const RestyleText = createText<Theme, Props<typeof RNText>>();
const AnimatedRestyleText = createText<Theme, Props<typeof Animated.Text>>(
	Animated.Text
);

const textRestyleFunctions = [
	createVariant({ themeKey: 'textVariants' }),
	color,
	layout,
	spacing,
	border,
	backgroundColor
];

export type InanimateTextProps = RestyleTextProps<Theme> &
	Props<typeof RestyleText> &
	LayoutProps<Theme> &
	SpacingProps<Theme> &
	BorderProps<Theme> &
	BackgroundColorProps<Theme>;
export type AnimatedTextProps = RestyleTextProps<Theme> &
	Props<typeof Animated.Text> &
	LayoutProps<Theme> &
	SpacingProps<Theme> &
	BorderProps<Theme> &
	BackgroundColorProps<Theme>;

const InanimateText = createRestyleComponent<InanimateTextProps, Theme>(
	textRestyleFunctions,
	RestyleText
);

const AnimatedText = createRestyleComponent<AnimatedTextProps, Theme>(
	textRestyleFunctions,
	AnimatedRestyleText
);

export { AnimatedText, InanimateText };
