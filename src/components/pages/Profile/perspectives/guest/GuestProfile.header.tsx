import { Header, HeaderSection, HeaderTitle } from '@organisms';
import React from 'react';

const GuestProfilePageHeader: React.FC = () => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderTitle
						title='Guest'
						titleProps={{ variant: 'paragraph-medium' }}
					/>
				}
			/>
		</Header>
	);
};

export default GuestProfilePageHeader;
