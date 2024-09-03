import { SearchItem } from '@flux/api/search';
import { SearchType } from '@flux/api/search/search.entity';
import {
	SequenceApi,
	TextInputApi,
	ToggleApi,
	useNavigation,
	usePersistedSearchState,
	useSequence,
	useTextInput,
	useToggle
} from '@hooks';
import { useState } from 'react';

interface IUseSearchPage {
	/**
	 * Overall search state
	 */
	searchActiveApi: ToggleApi;
	onPressSearchResult: (item: SearchItem) => void;
	recentSearches: SearchItem[];
	activeSearchTypeSequenceApi: SequenceApi;

	/**
	 * Search anything
	 */
	searchAnythingText: string;
	setSearchAnythingText: (text: string) => void;

	/**
	 * Search tags
	 */
	searchTagsText: string;
	setSearchTagsText: (text: string) => void;
	clearTagTextInput: () => void;
	tagTextInputApi: TextInputApi;
}

const useSearchPage = (): IUseSearchPage => {
	const tagTextInputApi = useTextInput();
	const activeSearchTypeSequenceApi = useSequence(1);
	const searchActiveApi = useToggle();

	const { artistPage, tagPage } = useNavigation();
	const { addRecentSearch, recentSearches } = usePersistedSearchState();
	const [searchAnythingText, setSearchAnythingText] = useState<string>('');
	const [searchTagsText, setSearchTagsText] = useState<string>('');

	const onPressSearchResult = (item: SearchItem) => {
		addRecentSearch(item);
		if (item.searchType === SearchType.ARTIST) {
			artistPage(item.uid);
		} else if (item.searchType === SearchType.TAG) {
			tagPage(item.uid);
		}
	};

	const clearTagTextInput = () => {
		tagTextInputApi.clear();
		setSearchTagsText('');
	};

	return {
		searchActiveApi,
		onPressSearchResult,
		recentSearches,
		activeSearchTypeSequenceApi,

		searchAnythingText,
		setSearchAnythingText,

		searchTagsText,
		setSearchTagsText,
		clearTagTextInput,
		tagTextInputApi
	};
};

export default useSearchPage;
