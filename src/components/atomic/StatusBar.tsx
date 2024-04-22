import { useTheme } from '@hooks';
import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';

const StatusBar = () => {
	const { mode } = useTheme();

	if (mode === 'light') return <RNStatusBar barStyle='dark-content' />;

	if (mode === 'dark') return <RNStatusBar barStyle='light-content' />;
};

export default StatusBar;
