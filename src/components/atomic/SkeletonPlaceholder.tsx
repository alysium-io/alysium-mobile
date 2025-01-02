import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import RNSkeletonPlaceholder from 'react-native-skeleton-placeholder';

type SkeletonPlaceholderProps = Props<typeof RNSkeletonPlaceholder> & {};

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
	...props
}) => {
	const { theme } = useTheme();
	return (
		<RNSkeletonPlaceholder
			speed={2000}
			highlightColor={theme.colors['skeleton-placeholder.highlight']}
			backgroundColor={theme.colors['skeleton-placeholder.bg']}
			{...props}
		/>
	);
};

export default SkeletonPlaceholder;
