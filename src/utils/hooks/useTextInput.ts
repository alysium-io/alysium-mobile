import React, { useEffect, useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export interface TextInputApi {
	ref: React.RefObject<RNTextInput>;
	focus: () => void;
	blur: () => void;
	clear: () => void;
	setText: (text: string) => void;
}

const useTextInput = (defaultText: string = ''): TextInputApi => {
	const ref = useRef<RNTextInput>(null);
	const focus = () => ref.current?.focus();
	const blur = () => ref.current?.blur();
	const clear = () => ref.current?.clear();
	const setText = (text: string) => ref.current?.setNativeProps({ text });

	useEffect(() => {
		setText(defaultText);
	}, []);

	return {
		ref,
		focus,
		blur,
		clear,
		setText
	};
};

export default useTextInput;
