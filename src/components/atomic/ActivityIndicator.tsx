import { useTheme } from '@hooks';
import React from 'react';
import {
	ActivityIndicator as RNActivityIndicator,
	ActivityIndicatorProps as RNActivityIndicatorProps
} from 'react-native';

interface ActivityIndicatorProps extends RNActivityIndicatorProps {}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ ...props }) => {
	const { theme } = useTheme();
	return <RNActivityIndicator color={theme.colors.t2} {...props} />;
};

export default ActivityIndicator;
