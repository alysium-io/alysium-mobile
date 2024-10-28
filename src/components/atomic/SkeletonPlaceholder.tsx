import React from 'react';
import RNSkeletonPlaceholder from 'react-native-skeleton-placeholder';

type SkeletonPlaceholderProps = React.ComponentProps<
	typeof RNSkeletonPlaceholder
> & {};

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
	...props
}) => {
	return <RNSkeletonPlaceholder speed={2000} {...props} />;
};

export default SkeletonPlaceholder;
