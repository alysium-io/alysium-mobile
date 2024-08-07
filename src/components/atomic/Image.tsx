import {
	AnimatedImage,
	AnimatedImageProps,
	InanimateImage,
	InanimateImageProps
} from '@subatomic';
import React from 'react';

type ImageProps =
	| (InanimateImageProps & { animated: false })
	| (AnimatedImageProps & { animated?: true });

const Image: React.FC<ImageProps> = ({ animated = true, ...props }) => {
	if (animated) {
		const animatedBoxProps = props as AnimatedImageProps;
		return <AnimatedImage {...animatedBoxProps} />;
	} else {
		const boxProps = props as InanimateImageProps;
		return <InanimateImage {...boxProps} />;
	}
};

export default Image;
