import { useTheme } from '@hooks';
import { Props, ThemeMode } from '@types';
import React from 'react';
import RNSkeletonPlaceholder from 'react-native-skeleton-placeholder';

type SkeletonPlaceholderProps = Props<typeof RNSkeletonPlaceholder> & {};

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> = ({
	...props
}) => {
	const { themeMode } = useTheme();
	return (
		<RNSkeletonPlaceholder
			speed={2000}
			highlightColor={
				themeMode === ThemeMode.dark ? 'rgba(255, 255, 255, 0.1)' : undefined
			}
			backgroundColor={themeMode === ThemeMode.dark ? '#202020' : undefined}
			{...props}
		/>
	);
};

export default SkeletonPlaceholder;
