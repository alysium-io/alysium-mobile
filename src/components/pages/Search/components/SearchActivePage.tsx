import { SearchType } from '@flux/api/search/search.entity';
import { SearchApi } from '@hooks';
import React from 'react';
import { Case, Switch } from 'react-if';
import SearchArtistsPage from './SearchArtistsPage';
import SearchScenesPage from './SearchScenesPage';

interface SearchActivePageProps {
	searchApi: SearchApi;
	activeSearchType: SearchType;
}

const SearchActivePage: React.FC<SearchActivePageProps> = ({
	searchApi,
	activeSearchType
}) => {
	return (
		<Switch>
			<Case condition={activeSearchType === SearchType.artist}>
				<SearchArtistsPage searchApi={searchApi} />
			</Case>
			<Case condition={activeSearchType === SearchType.scene}>
				<SearchScenesPage searchApi={searchApi} />
			</Case>
		</Switch>
	);
};

export default SearchActivePage;
