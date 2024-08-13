import { Section, Text, View } from '@atomic';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SearchTagsResponseDto } from '@flux/api/search/dto/search-tags.dto';
import { ContentListItem } from '@molecules';
import React from 'react';

interface SearchResultsProps {
	artistSearchResults?: SearchArtistsResponseDto;
	tagSearchResults?: SearchTagsResponseDto;
	onPressSearchResult: (result: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	artistSearchResults,
	tagSearchResults,
	onPressSearchResult
}) => {
	return (
		<View marginTop='xl'>
			{tagSearchResults && tagSearchResults.hits.length > 0 && (
				<Section>
					<Text
						variant='section-header-1'
						marginBottom='m'
						marginHorizontal='m'
					>
						Tags
					</Text>
					{tagSearchResults.hits.map((result) => (
						<ContentListItem
							key={result.uid}
							onPress={() => onPressSearchResult(result)}
							titleTextProps={{
								title: result.name,
								bottomSubtext: 'Tag'
							}}
							profileImageProps={{
								defaultImageProps: {
									icon: 'tag'
								}
							}}
						/>
					))}
				</Section>
			)}
			{artistSearchResults && artistSearchResults.hits.length > 0 && (
				<Section>
					<Text
						variant='section-header-1'
						marginBottom='m'
						marginHorizontal='m'
					>
						Artists
					</Text>
					{artistSearchResults.hits.map((result) => (
						<ContentListItem
							key={result.uid}
							onPress={() => onPressSearchResult(result)}
							titleTextProps={{
								title: result.name,
								bottomSubtext: 'Artist'
							}}
							profileImageProps={{
								defaultImageProps: {
									icon: 'artist'
								}
							}}
						/>
					))}
				</Section>
			)}
		</View>
	);
};

export default SearchResults;
