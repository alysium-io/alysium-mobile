import { ImageProps, Image as SubatomicImage } from '@subatomic';
import React from 'react';

const Image: React.FC<ImageProps> = ({ ...props }) => {
	return <SubatomicImage {...props} />;
};

export default Image;
