import { SearchItem } from '@flux/api/search';
import { SearchType } from '@flux/api/search/search.entity';
import {
	SearchApi,
	SequenceApi,
	ToggleApi,
	useNavigation,
	usePersistedSearchState,
	useSearch,
	useSequence,
	useToggle
} from '@hooks';

interface IUseSearchPage {
	onPressSearchResult: (item: SearchItem) => void;
	recentSearches: SearchItem[];
	activeSearchTypeSequenceApi: SequenceApi;
	searchAnythingApi: SearchApi;
	searchTagsApi: SearchApi;
	searchActiveApi: ToggleApi;
}

const useSearchPage = (): IUseSearchPage => {
	const activeSearchTypeSequenceApi = useSequence(1);
	const { artistPage, tagPage } = useNavigation();
	const { addRecentSearch, recentSearches } = usePersistedSearchState();

	const searchActiveApi = useToggle();
	const searchAnythingApi = useSearch({
		methods: {
			onBarDidActivate: searchActiveApi.on,
			onBarDidDeactivate: searchActiveApi.off
		}
	});
	const searchTagsApi = useSearch({
		methods: {
			onBarDidActivate: searchActiveApi.on,
			onBarDidDeactivate: searchActiveApi.off
		}
	});

	const onPressSearchResult = (item: SearchItem) => {
		addRecentSearch(item);
		if (item.searchType === SearchType.ARTIST) {
			artistPage(item.uid, {
				from: 'SearchPage',
				to: 'ArtistPage',
				to_uid: item.uid,
				using: 'ARTIST_SEARCH_RESULT'
			});
		} else if (item.searchType === SearchType.TAG) {
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
		activeSearchTypeSequenceApi,
		searchAnythingApi,
		searchTagsApi,
		searchActiveApi
	};
};

export default useSearchPage;
