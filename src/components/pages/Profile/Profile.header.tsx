import { Header, HeaderSection, HeaderTitle } from '@organisms';
import React from 'react';

const ProfilePageHeader: React.FC = () => {
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

export default ProfilePageHeader;
