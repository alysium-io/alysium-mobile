import { View } from '@atomic';
import { SearchItem } from '@flux/api/search';
import { SearchApi, SequenceApi } from '@hooks';
import { Sequence } from '@organisms';
import React from 'react';
import AnythingSearchActivePage from './AnythingSearchActivePage';
import TagsSearchActivePage from './TagsSearchActivePage';

interface SearchActivePageProps {
	recentSearches: SearchItem[];
	onPressSearchResult: (item: SearchItem) => void;
	activeSearchTypeSequenceApi: SequenceApi;
	searchAnythingApi: SearchApi;
	searchTagsApi: SearchApi;
}

const SearchActivePage: React.FC<SearchActivePageProps> = ({
	recentSearches,
	onPressSearchResult,
	activeSearchTypeSequenceApi,
	searchAnythingApi,
	searchTagsApi
}) => {
	return (
		<View flex={1}>
			<Sequence sequenceIndex={activeSearchTypeSequenceApi.sequenceIndex}>
				<AnythingSearchActivePage
					searchAnythingApi={searchAnythingApi}
					recentSearches={recentSearches}
					onPressSearchResult={onPressSearchResult}
				/>
				<TagsSearchActivePage
					searchTagsApi={searchTagsApi}
					onPressSearchResult={onPressSearchResult}
				/>
			</Sequence>
		</View>
	);
};

export default SearchActivePage;
