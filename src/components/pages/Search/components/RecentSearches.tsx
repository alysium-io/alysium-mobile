import { Section, View } from '@atomic';
import { Search } from '@flux/api/search';
import { SectionHeader } from '@molecules';
import { ContentListItem } from '@organisms';
import { ContentType } from '@types';
import React from 'react';

interface RecentSearchesProps {
	recentSearches?: Search[];
	onPressSearchResult: (result: any) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
	recentSearches,
	onPressSearchResult
}) => {
	return (
		<Section>
			<View marginHorizontal='m'>
				<SectionHeader text='Recent Searches' titleVariant='large' />
			</View>
			{recentSearches?.map((result) => (
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

export default RecentSearches;
