import { Icon, View } from '@atomic';
import { Header, HeaderTitle, SearchBar } from '@organisms';
import React from 'react';
import HeaderSection from 'src/components/organisms/Header/HeaderSection';

interface SearchPageHeaderProps {
	setSearchText: (text: string) => void;
	clearSearchText: () => void;
	isSearchActive: boolean;
	setIsSearchActive: (isActive: boolean) => void;
}

const SearchPageHeader: React.FC<SearchPageHeaderProps> = ({
	setSearchText,
	clearSearchText,
	isSearchActive,
	setIsSearchActive
}) => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderTitle
						title='Alysium'
						titleProps={{ variant: 'paragraph-medium' }}
					/>
				}
				RightComponent={<Icon name='logo' size='m' color='text.s' />}
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
