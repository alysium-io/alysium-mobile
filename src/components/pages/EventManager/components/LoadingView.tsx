import { ContentListItemSkeletonPlaceholder } from '@molecules';
import React from 'react';

const LoadingView = () => {
	return Array.from({ length: 10 }).map((_, index) => (
		<ContentListItemSkeletonPlaceholder key={index} />
	));
};

export default LoadingView;
