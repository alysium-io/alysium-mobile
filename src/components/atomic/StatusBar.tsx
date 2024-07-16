import { useTheme } from '@hooks';
import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';

const StatusBar = () => {
	const { theme } = useTheme();
	return <RNStatusBar barStyle={theme.colors['etc.status-bar']} />;
};

export default StatusBar;
