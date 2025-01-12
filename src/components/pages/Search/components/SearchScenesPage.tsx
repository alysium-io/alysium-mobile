import { ScrollView } from '@atomic';
import { searchApiSlice } from '@flux/api/search';
import { SearchApi, usePagination, usePersistedSearchState } from '@hooks';
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
	const {
		isSceneRecentSearchesEmpty,
		resetSceneRecentSearches,
		sceneRecentSearches
	} = usePersistedSearchState();
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
				<Case
					condition={
						searchApi.searchText.length === 0 && isSceneRecentSearchesEmpty
					}
				>
					<NoRecentSearches />
				</Case>
				<Case condition={searchApi.searchText.length === 0}>
					<RecentSearches
						recentSearches={sceneRecentSearches}
						onPressSearchResult={onPressSceneSearchItem}
						onPressClear={resetSceneRecentSearches}
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
