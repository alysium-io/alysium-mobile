import { Props } from '@types';
import React from 'react';
import RNSkeletonPlaceholder from 'react-native-skeleton-placeholder';

type SkeletonPlaceholderProps = Props<typeof RNSkeletonPlaceholder> & {};

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
	...props
}) => {
	return <RNSkeletonPlaceholder speed={2000} {...props} />;
};

export default SkeletonPlaceholder;
