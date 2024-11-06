import { useEffect, useState } from 'react';
import useKeyboard from './useKeyboard';
import useTextInput, { TextInputApi } from './useTextInput';
import useToggle, { ToggleApi } from './useToggle';

type UseSearchConfigMethods = {
	onChangeText?: (text: string) => void;
	onBarDidActivate?: () => void;
	onBarDidDeactivate?: () => void;
	onPressClearText?: () => void;
};

type UseSearchConfig = {
	defaultText?: string;
	methods?: UseSearchConfigMethods;
	isActive?: boolean;
	isClearButtonVisible?: boolean;
};

export type SearchApi = UseSearchConfigMethods & {
	searchText: string;
	textInputApi: TextInputApi;
	activeToggleApi: ToggleApi;
	clearButtonToggleApi: ToggleApi;
	pressActivate: () => void;
	pressDeactivate: () => void;
	pressClear: () => void;
};

const useSearch = (config?: UseSearchConfig): SearchApi => {
	const [searchText, setSearchText] = useState(config?.defaultText ?? '');
	const activeToggleApi = useToggle(
		config?.isActive !== undefined ? config.isActive : false
	);
	const clearButtonToggleApi = useToggle(
		config?.isClearButtonVisible !== undefined
			? config.isClearButtonVisible
			: false
	);

	const textInputApi = useTextInput();
	const { dismiss } = useKeyboard();

	useEffect(() => {
		if (searchText.length > 0) {
			clearButtonToggleApi.on();
			textInputApi.setText(searchText);
		}
	}, []);

	const pressActivate = () => {
		activeToggleApi.on();
		textInputApi.focus();
		config?.methods?.onBarDidActivate?.();
	};

	const pressDeactivate = () => {
		dismiss();
		activeToggleApi.off();
		textInputApi.blur();
		config?.methods?.onBarDidDeactivate?.();
	};

	const pressClear = () => {
		textInputApi.clear();
		clearButtonToggleApi.off();
		setSearchText('');
		config?.methods?.onPressClearText?.();
	};

	const _onChangeText = (text: string) => {
		setSearchText(text);
		clearButtonToggleApi.set(text.length > 0);
		config?.methods?.onChangeText?.(text);
	};

	return {
		searchText,
		onChangeText: _onChangeText,
		textInputApi,
		activeToggleApi,
		clearButtonToggleApi,
		pressActivate,
		pressDeactivate,
		pressClear
	};
};

export default useSearch;
