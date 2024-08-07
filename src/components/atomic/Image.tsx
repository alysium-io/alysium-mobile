import {
	AnimatedImage,
	AnimatedImageProps,
	InanimateImage,
	InanimateImageProps
} from '@subatomic';
import React, { useState } from 'react';

type ImageProps =
	| (InanimateImageProps & { animated: false })
	| (AnimatedImageProps & { animated?: true });

const Image: React.FC<ImageProps> = ({ animated = true, ...props }) => {
	const [hasError, setHasError] = useState<boolean>(false);
	const handleError = () => setHasError(true);

	if (animated) {
		const animatedBoxProps = props as AnimatedImageProps;
		return <AnimatedImage onError={handleError} {...animatedBoxProps} />;
	} else {
		const boxProps = props as InanimateImageProps;
		return <InanimateImage onError={handleError} {...boxProps} />;
	}
};

export default Image;
