import { LView } from '@atomic';
import { SearchType } from '@flux/api/search/search.entity';
import { SearchApi } from '@hooks';
import { TabToggler } from '@molecules';
import { Header, SearchBar } from '@organisms';
import React from 'react';
import { If, Then } from 'react-if';

interface SearchPageHeaderProps {
	searchApi: SearchApi;
	activeSearchType: SearchType;
	setActiveSearchType: (searchType: SearchType) => void;
}

const SearchPageHeader: React.FC<SearchPageHeaderProps> = ({
	searchApi,
	activeSearchType,
	setActiveSearchType
}) => {
	return (
		<Header>
			<If condition={searchApi.activeToggleApi.state}>
				<Then>
					<LView margin='m'>
						<TabToggler
							defaultActiveTab={activeSearchType}
							onChange={setActiveSearchType}
							data={[
								{ text: 'artists', id: SearchType.artist },
								{ text: 'scenes', id: SearchType.scene }
							]}
						/>
					</LView>
				</Then>
			</If>
			<LView margin='m' marginTop='m'>
				<SearchBar searchApi={searchApi} />
			</LView>
		</Header>
	);
};

export default SearchPageHeader;
