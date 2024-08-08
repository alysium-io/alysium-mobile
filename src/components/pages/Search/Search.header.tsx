import { Icon, View } from '@atomic';
import { Header, HeaderTitle } from '@organisms';
import React from 'react';

const SearchPageHeader: React.FC = () => {
	return (
		<Header
			LeftComponent={
				<View flexDirection='row' alignItems='center'>
					<HeaderTitle
						title='Alysium'
						titleProps={{ variant: 'paragraph-medium' }}
					/>
				</View>
			}
			CenterComponent={undefined}
			RightComponent={<Icon name='logo' size='m' color='text.s' />}
		/>
	);
};

export default SearchPageHeader;
