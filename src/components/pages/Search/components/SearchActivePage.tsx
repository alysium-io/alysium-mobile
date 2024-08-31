import { View } from '@atomic';
import { SearchItem } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SearchTagsResponseDto } from '@flux/api/search/dto/search-tags.dto';
import { SequenceApi } from '@hooks';
import { Sequence } from '@organisms';
import React from 'react';
import AnythingSearchActivePage from './AnythingSearchActivePage';
import TagsSearchActivePage from './TagsSearchActivePage';

interface SearchActivePageProps {
	searchText: string;
	isLoading: boolean;
	recentSearches: SearchItem[];
	artistSearchResults?: SearchArtistsResponseDto;
	tagSearchResults?: SearchTagsResponseDto;
	onPressSearchResult: (item: SearchItem) => void;
	activeSearchTypeSequenceApi: SequenceApi;
}

const SearchActivePage: React.FC<SearchActivePageProps> = ({
	searchText,
	isLoading,
	recentSearches,
	onPressSearchResult,
	artistSearchResults,
	tagSearchResults,
	activeSearchTypeSequenceApi
}) => {
	return (
		<View flex={1}>
			<Sequence sequenceIndex={activeSearchTypeSequenceApi.sequenceIndex}>
				<AnythingSearchActivePage
					searchText={searchText}
					isLoading={isLoading}
					recentSearches={recentSearches}
					onPressSearchResult={onPressSearchResult}
					artistSearchResults={artistSearchResults}
					tagSearchResults={tagSearchResults}
				/>
				<TagsSearchActivePage />
			</Sequence>
		</View>
	);
};

export default SearchActivePage;
