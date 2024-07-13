import { useTheme } from '@hooks';
import { SemanticColors } from '@types';
import React from 'react';
import {
	ActivityIndicator as RNActivityIndicator,
	ActivityIndicatorProps as RNActivityIndicatorProps
} from 'react-native';

interface ActivityIndicatorProps
	extends Omit<RNActivityIndicatorProps, 'color'> {
	color?: keyof SemanticColors;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
	color = 'etc.activity-indicator',
	...props
}) => {
	const { theme } = useTheme();
	return <RNActivityIndicator color={theme.colors[color]} {...props} />;
};

export default ActivityIndicator;
