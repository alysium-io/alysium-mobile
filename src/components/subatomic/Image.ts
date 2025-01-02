import {
	VariantProps,
	createBox,
	createRestyleComponent,
	createVariant
} from '@shopify/restyle';
import { Props, Theme } from '@types';
import FastImage from 'react-native-fast-image';

const RestyleImage = createBox<Theme, Props<typeof FastImage>>(FastImage);

const imageRestyleFunctions = [
	// You can add your own customization functions or theme variants here
	createVariant({ themeKey: 'imageVariants' })
];

export type ImageProps = VariantProps<Theme, 'imageVariants'> &
	Props<typeof RestyleImage>;

const Image = createRestyleComponent<ImageProps, Theme>(
	[imageRestyleFunctions],
	RestyleImage
);

export { Image };
