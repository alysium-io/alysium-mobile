import { Icon, View } from '@atomic';
import { Vibrator } from '@etc';
import { SearchApi, SequenceApi } from '@hooks';
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
	activeSearchTypeSequenceApi: SequenceApi;
	searchAnythingApi: SearchApi;
	searchTagsApi: SearchApi;
}

const SearchPageHeader: React.FC<SearchPageHeaderProps> = ({
	activeSearchTypeSequenceApi,
	searchAnythingApi,
	searchTagsApi
}) => {
	const onPressTabToggler = (index: number) => {
		Vibrator.notificationWarning();
		activeSearchTypeSequenceApi.goTo(index);
	};

	return (
		<Header>
			<If condition={searchAnythingApi.searchText}>
				<Then>
					<View
						margin='m'
						animated
						entering={FadeIn.duration(300)}
						layout={LinearTransition.duration(300)}
					>
						<TabToggler
							defaultActiveTab={activeSearchTypeSequenceApi.sequenceIndex}
							onChange={onPressTabToggler}
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
						<SearchBar searchApi={searchAnythingApi} />
					</View>
					<View margin='m' marginTop='m'>
						<SearchBar searchApi={searchTagsApi} />
					</View>
				</Sequence>
			</View>
		</Header>
	);
};

export default SearchPageHeader;
