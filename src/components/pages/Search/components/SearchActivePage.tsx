import { View } from '@atomic';
import { SearchItem } from '@flux/api/search';
import { SequenceApi } from '@hooks';
import { Sequence } from '@organisms';
import React from 'react';
import AnythingSearchActivePage from './AnythingSearchActivePage';
import TagsSearchActivePage from './TagsSearchActivePage';

interface SearchActivePageProps {
	searchAnythingText: string;
	searchTagsText: string;
	recentSearches: SearchItem[];
	onPressSearchResult: (item: SearchItem) => void;
	activeSearchTypeSequenceApi: SequenceApi;
	clearTagTextInput: () => void;
}

const SearchActivePage: React.FC<SearchActivePageProps> = ({
	searchAnythingText,
	searchTagsText,
	recentSearches,
	onPressSearchResult,
	activeSearchTypeSequenceApi,
	clearTagTextInput
}) => {
	return (
		<View flex={1}>
			<Sequence sequenceIndex={activeSearchTypeSequenceApi.sequenceIndex}>
				<AnythingSearchActivePage
					searchAnythingText={searchAnythingText}
					recentSearches={recentSearches}
					onPressSearchResult={onPressSearchResult}
				/>
				<TagsSearchActivePage
					searchTagsText={searchTagsText}
					onPressSearchResult={onPressSearchResult}
					clearTagTextInput={clearTagTextInput}
				/>
			</Sequence>
		</View>
	);
};

export default SearchActivePage;
