import { Section, View } from '@atomic';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SectionHeader } from '@molecules';
import { ContentListItem } from '@organisms';
import { ContentType } from '@types';
import React from 'react';

interface SearchResultsProps {
	searchResults?: SearchArtistsResponseDto;
	onPressSearchResult: (result: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	searchResults,
	onPressSearchResult
}) => {
	if (!searchResults?.hits) {
		return null;
	}
	return (
		<Section>
			<View marginHorizontal='m'>
				<SectionHeader text='Search Results' titleVariant='large' />
			</View>
			{searchResults.hits?.map((result) => (
				<ContentListItem
					key={result.id}
					title={result.name}
					subtitle='artist'
					onPress={() => onPressSearchResult(result)}
					contentType={ContentType.artist}
					border
				/>
			))}
		</Section>
	);
};

export default SearchResults;
