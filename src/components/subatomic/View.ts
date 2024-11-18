import {
	VariantProps,
	createBox,
	createRestyleComponent,
	createVariant
} from '@shopify/restyle';
import { Props, Theme } from '@types';
import { View as RNView } from 'react-native';
import Animated from 'react-native-reanimated';

const RestyleView = createBox<Theme, Props<typeof RNView>>();
const AnimatedRestyleView = createBox<Theme, Props<typeof Animated.View>>(
	Animated.View
);

const viewRestyleFunctions = [createVariant({ themeKey: 'cardVariants' })];

export type InanimateViewProps = VariantProps<Theme, 'cardVariants'> &
	Props<typeof RestyleView>;
export type AnimatedViewProps = VariantProps<Theme, 'cardVariants'> &
	Props<typeof AnimatedRestyleView>;

const InanimateView = createRestyleComponent<InanimateViewProps, Theme>(
	[viewRestyleFunctions],
	RestyleView
);

const AnimatedView = createRestyleComponent<AnimatedViewProps, Theme>(
	[viewRestyleFunctions],
	AnimatedRestyleView
);

export { AnimatedView, InanimateView };
