import { useTheme } from '@hooks';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNToast from 'react-native-toast-message';

const Toast = () => {
	/**
	 * The purpose of this is to only be used once at the root.
	 * Do not import this into any other component.
	 *
	 * If you want to show the toast, import the Toast from 'react-native-toast-message'
	 * and call the Toast.show({ ... }) method.
	 */
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	return <RNToast topOffset={insets.top + theme.spacing.m} />;
};

export default Toast;
