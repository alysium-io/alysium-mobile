import { LView } from '@atomic';
import { SearchType } from '@flux/api/search/search.entity';
import { useSearch } from '@hooks';
import { BasePage } from '@organisms';
import React, { useState } from 'react';
import { Case, Switch } from 'react-if';
import SearchActivePage from './components/SearchActivePage';
import SearchInactivePage from './components/SearchInactivePage';
import SearchPageHeader from './Search.header';

const SearchPage = () => {
	const searchApi = useSearch();
	const [activeSearchType, setActiveSearchType] = useState<SearchType>(
		SearchType.artist
	);

	const _setActiveSearchType = (searchType: SearchType) => {
		setActiveSearchType(searchType);
		searchApi.reset();
	};

	return (
		<BasePage>
			<SearchPageHeader
				searchApi={searchApi}
				activeSearchType={activeSearchType}
				setActiveSearchType={_setActiveSearchType}
			/>
			<LView flex={1} backgroundColor='bg.p'>
				<Switch>
					<Case condition={searchApi.activeToggleApi.state}>
						<SearchActivePage
							activeSearchType={activeSearchType}
							searchApi={searchApi}
						/>
					</Case>
					<Case condition={!searchApi.activeToggleApi.state}>
						<SearchInactivePage />
					</Case>
				</Switch>
			</LView>
		</BasePage>
	);
};

export default SearchPage;
