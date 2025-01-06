import { Section } from '@atomic';
import { Formatting } from '@etc';
import { SearchItem } from '@flux/api/search';
import { SearchResponseDto } from '@flux/api/search/search.entity';
import { ContentListItem } from '@molecules';
import React from 'react';

interface SearchResultsProps {
	searchResults?: SearchResponseDto<any>;
	onPressSearchResult: (result: SearchItem) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	searchResults,
	onPressSearchResult
}) => {
	return (
		<Section>
			{searchResults && searchResults.hits.length > 0 && (
				<Section>
					{searchResults.hits.map((result) => {
						return (
							<ContentListItem
								key={result.uid}
								onPress={() => onPressSearchResult(result)}
								titleTextProps={{
									title: result.name,
									bottomSubtext: Formatting.formatNumFollowers(result.followers)
								}}
							/>
						);
					})}
				</Section>
			)}
		</Section>
	);
};

export default SearchResults;
