import { useTheme } from '@hooks';
import React from 'react';
import {
	RefreshControl as RNRefreshControl,
	RefreshControlProps
} from 'react-native';

const RefreshControl: React.FC<RefreshControlProps> = ({
	tintColor,
	...props
}) => {
	const { theme } = useTheme();
	return (
		<RNRefreshControl
			tintColor={tintColor ?? theme.colors['text.t']}
			{...props}
		/>
	);
};

export default RefreshControl;
