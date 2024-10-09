import { Header, HeaderSection, HeaderTitle } from '@organisms';
import React from 'react';

const UserProfilePageHeader: React.FC = () => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderTitle
						title='Account'
						titleProps={{ variant: 'paragraph-medium' }}
					/>
				}
			/>
		</Header>
	);
};

export default UserProfilePageHeader;
