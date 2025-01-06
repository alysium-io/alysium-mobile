import { LView } from '@atomic';
import { SearchItem } from '@flux/api/search';
import { SearchType } from '@flux/api/search/search.entity';
import { SearchApi } from '@hooks';
import React from 'react';
import { Case, Switch } from 'react-if';
import SearchArtistsPage from './SearchArtistsPage';
import SearchScenesPage from './SearchScenesPage';

interface SearchActivePageProps {
	recentSearches: SearchItem[];
	onPressSearchResult: (item: SearchItem) => void;
	searchApi: SearchApi;
	activeSearchType: SearchType;
}

const SearchActivePage: React.FC<SearchActivePageProps> = ({
	recentSearches,
	onPressSearchResult,
	searchApi,
	activeSearchType
}) => {
	return (
		<LView flex={1}>
			<Switch>
				<Case condition={activeSearchType === SearchType.artist}>
					<SearchArtistsPage
						searchApi={searchApi}
						recentSearches={recentSearches}
						onPressSearchResult={onPressSearchResult}
					/>
				</Case>
				<Case condition={activeSearchType === SearchType.scene}>
					<SearchScenesPage
						searchApi={searchApi}
						recentSearches={recentSearches}
						onPressSearchResult={onPressSearchResult}
					/>
				</Case>
			</Switch>
		</LView>
	);
};

export default SearchActivePage;
