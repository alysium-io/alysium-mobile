import { ScrollView } from '@atomic';
import { searchApiSlice } from '@flux/api/search';
import { usePersistedArray } from '@flux/local/arrays/usePersistedArray';
import { SearchApi, usePagination } from '@hooks';
import React from 'react';
import { Case, Switch } from 'react-if';
import usePressSearchIteraction from '../usePressSearchIteraction';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';
import LoadingSearchResults from './SearchResultsLoading';

interface SearchScenesPageProps {
	searchApi: SearchApi;
}

const SearchScenesPage: React.FC<SearchScenesPageProps> = ({ searchApi }) => {
	const { page, defaultLimit } = usePagination();
	const { onPressSceneSearchItem } = usePressSearchIteraction();
	const { isEmpty, reset, items } = usePersistedArray('homeRecentSearchScenes');
	const { data, isFetching } = searchApiSlice.useSearchScenesQuery(
		{
			body: { q: searchApi.searchText },
			query: {
				page,
				limit: defaultLimit
			}
		},
		{ skip: searchApi.searchText.length === 0 }
	);

	return (
		<ScrollView>
			<Switch>
				<Case condition={isFetching}>
					<LoadingSearchResults />
				</Case>
				<Case condition={searchApi.searchText.length === 0 && isEmpty}>
					<NoRecentSearches />
				</Case>
				<Case condition={searchApi.searchText.length === 0}>
					<RecentSearches
						recentSearches={items}
						onPressSearchResult={onPressSceneSearchItem}
						onPressClear={reset}
					/>
				</Case>
				<Case condition={searchApi.searchText.length > 0}>
					<SearchResults
						searchResults={data}
						onPressSearchResult={onPressSceneSearchItem}
					/>
				</Case>
			</Switch>
		</ScrollView>
	);
};

export default SearchScenesPage;
