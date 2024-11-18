import {
	VariantProps,
	createBox,
	createRestyleComponent,
	createVariant
} from '@shopify/restyle';
import { Props, Theme } from '@types';
import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Animated from 'react-native-reanimated';

const AnimatedFastImage = Animated.createAnimatedComponent(
	FastImage as React.FC<FastImageProps>
);

const RestyleImage = createBox<Theme, Props<typeof FastImage>>();
const AnimatedRestyleImage = createBox<Theme, Props<typeof Animated.Image>>(
	AnimatedFastImage
);

const imageRestyleFunctions = [
	// You can add your own customization functions or theme variants here
	createVariant({ themeKey: 'imageVariants' })
];

export type InanimateImageProps = VariantProps<Theme, 'imageVariants'> &
	Props<typeof RestyleImage>;
export type AnimatedImageProps = VariantProps<Theme, 'imageVariants'> &
	Props<typeof Animated.Image> &
	Props<typeof RestyleImage>;

const InanimateImage = createRestyleComponent<InanimateImageProps, Theme>(
	[imageRestyleFunctions],
	RestyleImage
);

const AnimatedImage = createRestyleComponent<AnimatedImageProps, Theme>(
	[imageRestyleFunctions],
	AnimatedRestyleImage
);

export { AnimatedImage, InanimateImage };
