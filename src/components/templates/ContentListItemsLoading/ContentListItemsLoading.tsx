import { ContentListItemSkeletonPlaceholder } from '@molecules';
import { Props } from '@types';
import React from 'react';

interface ContentListItemsLoadingProps
	extends Props<typeof ContentListItemSkeletonPlaceholder> {}

const ContentListItemsLoading: React.FC<ContentListItemsLoadingProps> = (
	props
) => {
	return Array.from({ length: 10 }).map((_, index) => (
		<ContentListItemSkeletonPlaceholder key={index} {...props} />
	));
};

export default ContentListItemsLoading;
