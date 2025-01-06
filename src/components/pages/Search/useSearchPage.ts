import { Vibrator } from '@etc';
import { SearchItem } from '@flux/api/search';
import { SearchType } from '@flux/api/search/search.entity';
import {
	SearchApi,
	useNavigation,
	usePersistedSearchState,
	useSearch
} from '@hooks';
import { useState } from 'react';

interface IUseSearchPage {
	onPressSearchResult: (item: SearchItem) => void;
	recentSearches: SearchItem[];
	searchApi: SearchApi;
	activeSearchType: SearchType;
	setActiveSearchType: (searchType: SearchType) => void;
}

const useSearchPage = (): IUseSearchPage => {
	const { artistPage, tagPage, scenePage } = useNavigation();
	const { addRecentSearch, recentSearches } = usePersistedSearchState();
	const [activeSearchType, setActiveSearchType] = useState<SearchType>(
		SearchType.artist
	);
	const searchApi = useSearch();

	const _setActiveSearchType = (searchType: SearchType) => {
		Vibrator.notificationWarning();
		setActiveSearchType(searchType);
		searchApi.reset();
	};

	const onPressSearchResult = (item: SearchItem) => {
		addRecentSearch(item);
		if (item.searchType === SearchType.artist) {
			artistPage(item.uid, {
				from: 'SearchPage',
				to: 'ArtistPage',
				to_uid: item.uid,
				using: 'ARTIST_SEARCH_RESULT'
			});
		} else if (item.searchType === SearchType.scene) {
			scenePage(item.uid, {
				from: 'SearchPage',
				to: 'ScenePage',
				to_uid: item.uid,
				using: 'SCENE_SEARCH_RESULT'
			});
		} else if (item.searchType === SearchType.tag) {
			tagPage(item.uid, {
				from: 'SearchPage',
				to: 'TagPage',
				to_uid: item.uid,
				using: 'TAG_SEARCH_RESULT'
			});
		}
	};

	return {
		onPressSearchResult,
		recentSearches,
		searchApi,
		activeSearchType,
		setActiveSearchType: _setActiveSearchType
	};
};

export default useSearchPage;
