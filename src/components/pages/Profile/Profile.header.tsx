import { Header, HeaderTitle } from '@organisms';
import React from 'react';

const ProfilePageHeader: React.FC = () => {
	return (
		<Header
			LeftComponent={
				<HeaderTitle
					title='Account'
					titleProps={{ variant: 'paragraph-medium' }}
				/>
			}
			CenterComponent={undefined}
			RightComponent={undefined}
		/>
	);
};

export default ProfilePageHeader;
