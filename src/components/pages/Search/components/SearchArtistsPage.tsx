import { ScrollView } from '@atomic';
import { searchApiSlice, SearchItem } from '@flux/api/search';
import { SearchApi, useKeyboard, usePagination } from '@hooks';
import React from 'react';
import { Case, Switch } from 'react-if';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';
import LoadingSearchResults from './SearchResultsLoading';

interface SearchArtistsPageProps {
	searchApi: SearchApi;
	recentSearches: SearchItem[];
	onPressSearchResult: (item: SearchItem) => void;
}

const SearchArtistsPage: React.FC<SearchArtistsPageProps> = ({
	searchApi,
	recentSearches,
	onPressSearchResult
}) => {
	const { dismiss } = useKeyboard();
	const { page, defaultLimit } = usePagination();
	const { data, isFetching } = searchApiSlice.useSearchArtistsQuery(
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
		<ScrollView style={{ overflow: 'visible' }}>
			<Switch>
				<Case condition={isFetching}>
					<LoadingSearchResults />
				</Case>
				<Case
					condition={
						searchApi.searchText.length === 0 && recentSearches.length === 0
					}
				>
					<NoRecentSearches />
				</Case>
				<Case condition={searchApi.searchText.length === 0}>
					<RecentSearches
						recentSearches={recentSearches}
						onPressSearchResult={onPressSearchResult}
					/>
				</Case>
				<Case condition={searchApi.searchText.length > 0}>
					<SearchResults
						onPressSearchResult={onPressSearchResult}
						searchResults={data}
					/>
				</Case>
			</Switch>
		</ScrollView>
	);
};

export default SearchArtistsPage;
