import { useTheme } from '@hooks';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNToast from 'react-native-toast-message';

const Toast = () => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	return <RNToast topOffset={insets.top + theme.spacing.m} />;
};

export default Toast;
