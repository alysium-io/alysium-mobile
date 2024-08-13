import { Icon, View } from '@atomic';
import { SheetApi } from '@hooks';
import { Header, HeaderIconButton, HeaderTitle, SearchBar } from '@organisms';
import { AnimatedView } from '@subatomic';
import React, { useCallback } from 'react';
import { Case, Default, Switch } from 'react-if';
import {
	FadeInLeft,
	FadeInRight,
	FadeOutLeft,
	FadeOutRight
} from 'react-native-reanimated';
import HeaderSection from 'src/components/organisms/Header/HeaderSection';

interface SearchPageHeaderProps {
	setSearchText: (text: string) => void;
	clearSearchText: () => void;
	isSearchActive: boolean;
	setIsSearchActive: (isActive: boolean) => void;
	searchFiltersBottomSheetApi: SheetApi;
}

const SearchPageHeader: React.FC<SearchPageHeaderProps> = ({
	setSearchText,
	clearSearchText,
	isSearchActive,
	setIsSearchActive,
	searchFiltersBottomSheetApi
}) => {
	const LeftComponent = useCallback(
		() => (
			<Switch>
				<Case condition={isSearchActive}>
					<AnimatedView entering={FadeInLeft} exiting={FadeOutLeft}>
						<HeaderTitle
							title='Search'
							titleProps={{ variant: 'paragraph-medium' }}
						/>
					</AnimatedView>
				</Case>
				<Default>
					<AnimatedView entering={FadeInLeft} exiting={FadeOutLeft}>
						<HeaderTitle
							title='Alysium'
							titleProps={{ variant: 'paragraph-medium' }}
						/>
					</AnimatedView>
				</Default>
			</Switch>
		),
		[isSearchActive]
	);

	const RightComponent = useCallback(
		() => (
			<Switch>
				<Case condition={isSearchActive}>
					<AnimatedView entering={FadeInRight} exiting={FadeOutRight}>
						<HeaderIconButton
							name='filter'
							size='m'
							onPress={searchFiltersBottomSheetApi.open}
						/>
					</AnimatedView>
				</Case>
				<Default>
					<AnimatedView entering={FadeInRight} exiting={FadeOutRight}>
						<Icon name='logo' size='m' color='text.s' />
					</AnimatedView>
				</Default>
			</Switch>
		),
		[isSearchActive, searchFiltersBottomSheetApi]
	);

	return (
		<Header>
			<HeaderSection
				LeftComponent={<LeftComponent />}
				RightComponent={<RightComponent />}
			/>
			<View margin='m' marginTop='none'>
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
