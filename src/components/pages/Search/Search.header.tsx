import { Icon, View } from '@atomic';
import { SequenceApi, TextInputApi, ToggleApi } from '@hooks';
import { TabToggler } from '@molecules';
import {
	Header,
	HeaderSection,
	HeaderTitle,
	SearchBar,
	Sequence
} from '@organisms';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { FadeIn, LinearTransition } from 'react-native-reanimated';

interface SearchPageHeaderProps {
	setSearchAnythingText: (text: string) => void;
	setSearchTagsText: (text: string) => void;
	searchActiveApi: ToggleApi;
	activeSearchTypeSequenceApi: SequenceApi;
	clearTagTextInput: () => void;
	tagTextInputApi: TextInputApi;
}

const SearchPageHeader: React.FC<SearchPageHeaderProps> = ({
	setSearchAnythingText,
	setSearchTagsText,
	searchActiveApi,
	activeSearchTypeSequenceApi,
	clearTagTextInput,
	tagTextInputApi
}) => {
	return (
		<Header>
			<If condition={searchActiveApi.state}>
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
			<View animated layout={LinearTransition.duration(300)}>
				<Sequence sequenceIndex={activeSearchTypeSequenceApi.sequenceIndex}>
					<View margin='m' marginTop='m'>
						<SearchBar
							onChangeText={setSearchAnythingText}
							onPressClearText={() => setSearchAnythingText('')}
							isActive={searchActiveApi.state}
							setIsActive={searchActiveApi.set}
						/>
					</View>
					<View margin='m' marginTop='m'>
						<SearchBar
							textInputApi={tagTextInputApi}
							onChangeText={setSearchTagsText}
							onPressClearText={clearTagTextInput}
							isActive={searchActiveApi.state}
							setIsActive={searchActiveApi.set}
						/>
					</View>
				</Sequence>
			</View>
		</Header>
	);
};

export default SearchPageHeader;
