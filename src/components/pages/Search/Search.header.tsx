import { LView } from '@atomic';
import { SearchType } from '@flux/api/search/search.entity';
import { SearchApi } from '@hooks';
import { TabToggler } from '@molecules';
import { Header, SearchBar } from '@organisms';
import React from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';

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
		<Header headerBackgroundProps={{ withBlur: false }}>
			{searchApi.activeToggleApi.state && (
				<LView
					// Believe it or not, setting this zIndex fixing the exiting animation not working, which is why it's here
					// https://github.com/software-mansion/react-native-reanimated/issues/4534#issuecomment-1967447198
					zIndex={9999}
					margin='m'
					entering={FadeIn.duration(500)}
					exiting={FadeOut.duration(200)}
				>
					<TabToggler
						defaultActiveTab={activeSearchType}
						onChange={setActiveSearchType}
						data={[
							{ text: 'artists', id: SearchType.artist },
							{ text: 'scenes', id: SearchType.scene }
						]}
					/>
				</LView>
			)}
			<LView margin='m' marginTop='m'>
				<SearchBar searchApi={searchApi} />
			</LView>
		</Header>
	);
};

export default SearchPageHeader;
