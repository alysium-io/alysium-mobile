import { Icon, View } from '@atomic';
import { SequenceApi } from '@hooks';
import { TabToggler } from '@molecules';
import { Header, HeaderSection, HeaderTitle, SearchBar } from '@organisms';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { FadeIn, LinearTransition } from 'react-native-reanimated';

interface SearchPageHeaderProps {
	setSearchText: (text: string) => void;
	clearSearchText: () => void;
	isSearchActive: boolean;
	setIsSearchActive: (isActive: boolean) => void;
	activeSearchTypeSequenceApi: SequenceApi;
}

const SearchPageHeader: React.FC<SearchPageHeaderProps> = ({
	setSearchText,
	clearSearchText,
	isSearchActive,
	setIsSearchActive,
	activeSearchTypeSequenceApi
}) => {
	return (
		<Header>
			<If condition={isSearchActive}>
				<Then>
					<View
						margin='m'
						animated
						entering={FadeIn.duration(300)}
						layout={LinearTransition.duration(300)}
					>
						<TabToggler
							defaultActiveTab={activeSearchTypeSequenceApi.sequenceIndex}
							onChange={activeSearchTypeSequenceApi.goTo}
							data={[
								{ text: 'anything', id: 0 },
								{ text: 'tags', id: 1 }
							]}
						/>
					</View>
				</Then>
				<Else>
					<View
						animated
						entering={FadeIn.duration(300)}
						layout={LinearTransition.duration(300)}
					>
						<HeaderSection
							LeftComponent={
								<HeaderTitle
									title='Alysium'
									titleProps={{ variant: 'paragraph-medium' }}
								/>
							}
							RightComponent={<Icon name='logo' size='m' color='text.s' />}
						/>
					</View>
				</Else>
			</If>
			<View
				margin='m'
				marginTop='none'
				animated
				layout={LinearTransition.duration(300)}
			>
				<SearchBar
					onChangeText={setSearchText}
					onPressClearText={clearSearchText}
					isActive={isSearchActive}
					setIsActive={setIsSearchActive}
				/>
			</View>
		</Header>
	);
};

export default SearchPageHeader;
