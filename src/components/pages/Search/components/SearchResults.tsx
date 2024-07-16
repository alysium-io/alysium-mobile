import { Section, Text } from '@atomic';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { ContentListItem } from '@molecules';
import React from 'react';

interface SearchResultsProps {
	searchResults?: SearchArtistsResponseDto;
	onPressSearchResult: (result: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	searchResults,
	onPressSearchResult
}) => {
	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m'>
				Search Results
			</Text>
			{searchResults?.hits?.map((result) => (
				<ContentListItem
					key={result.uid}
					onPress={() => onPressSearchResult(result)}
					titleTextProps={{
						title: result.name,
						bottomSubtext: 'artist'
					}}
				/>
			))}
		</Section>
	);
};

export default SearchResults;
