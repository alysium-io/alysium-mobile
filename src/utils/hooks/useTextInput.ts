import React, { useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export interface TextInputApi {
	ref: React.RefObject<RNTextInput>;
	focus: () => void;
	blur: () => void;
	clear: () => void;
	text: React.RefObject<string>;
	setText: (text: string) => void;
	clearText: () => void;
	reset: () => void;
}

const useTextInput = (defaultText: string = ''): TextInputApi => {
	const ref = useRef<RNTextInput>(null);
	const focus = () => ref.current?.focus();
	const blur = () => ref.current?.blur();
	const clear = () => ref.current?.clear();

	const text = useRef<string>(defaultText);
	const setText = (newText: string) => (text.current = newText);
	const clearText = () => (text.current = '');

	const reset = () => {
		clear();
		clearText();
	};

	return {
		ref,
		focus,
		blur,
		clear,
		text,
		setText,
		clearText,
		reset
	};
};

export default useTextInput;
