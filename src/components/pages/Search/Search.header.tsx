import { Header, HeaderTitle } from '@organisms';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

const SearchPageHeader: React.FC<StackHeaderProps> = (stackHeaderProps) => {
	return (
		<Header
			stackHeaderProps={stackHeaderProps}
			CenterComponent={() => <HeaderTitle title='alysium' />}
			RightComponent={undefined}
		/>
	);
};

export default SearchPageHeader;
