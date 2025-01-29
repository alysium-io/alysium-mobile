import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export interface TextInputFocusConfig {
	focusOnMount?: boolean;
	focusOnMountDelay?: number;
	useFocusEffect?: boolean;
}

const defaultConfig: TextInputFocusConfig = {
	focusOnMount: false,
	focusOnMountDelay: 500,
	useFocusEffect: true
};

const useTextInputFocusEffect = (
	ref: React.RefObject<RNTextInput>,
	userConfig?: TextInputFocusConfig
) => {
	const config = { ...defaultConfig, ...userConfig };

	const focusEffect = useCallback(() => {
		if (config.focusOnMount) {
			const timeout = setTimeout(() => {
				ref.current?.focus();
			}, config.focusOnMountDelay);

			return () => clearTimeout(timeout);
		}
	}, [config.focusOnMount, config.focusOnMountDelay, ref]);

	if (userConfig) {
		if (config.useFocusEffect) {
			useFocusEffect(focusEffect);
		} else {
			useEffect(focusEffect, []);
		}
	}
};

export default useTextInputFocusEffect;
