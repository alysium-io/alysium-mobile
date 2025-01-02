import { Icon, LView, View } from '@atomic';
import { Vibrator } from '@etc';
import { SearchApi, SequenceApi, ToggleApi } from '@hooks';
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

interface SearchPageHeaderProps {
	activeSearchTypeSequenceApi: SequenceApi;
	searchAnythingApi: SearchApi;
	searchTagsApi: SearchApi;
	searchActiveApi: ToggleApi;
}

const SearchPageHeader: React.FC<SearchPageHeaderProps> = ({
	activeSearchTypeSequenceApi,
	searchAnythingApi,
	searchTagsApi,
	searchActiveApi
}) => {
	const onPressTabToggler = (index: number) => {
		Vibrator.notificationWarning();
		activeSearchTypeSequenceApi.goTo(index);
	};

	return (
		<Header>
			<If condition={searchActiveApi.state}>
				<Then>
					<LView margin='m'>
						<TabToggler
							defaultActiveTab={activeSearchTypeSequenceApi.sequenceIndex}
							onChange={onPressTabToggler}
							data={[
								{ text: 'anything', id: 0 },
								{ text: 'tags', id: 1 }
							]}
						/>
					</LView>
				</Then>
				<Else>
					<LView>
						<HeaderSection
							LeftComponent={
								<HeaderTitle
									title='Alysium'
									titleProps={{ variant: 'paragraph-medium' }}
								/>
							}
							RightComponent={<Icon name='logo' size='m' color='text.s' />}
						/>
					</LView>
				</Else>
			</If>
			<LView>
				<Sequence sequenceIndex={activeSearchTypeSequenceApi.sequenceIndex}>
					<View margin='m' marginTop='m'>
						<SearchBar searchApi={searchAnythingApi} />
					</View>
					<View margin='m' marginTop='m'>
						<SearchBar searchApi={searchTagsApi} />
					</View>
				</Sequence>
			</LView>
		</Header>
	);
};

export default SearchPageHeader;
