import { Header, HeaderSection, HeaderTitle } from '@organisms';
import React from 'react';

const ArtistProfilePageHeader: React.FC = () => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderTitle
						title='Artist'
						titleProps={{ variant: 'paragraph-medium' }}
					/>
				}
			/>
		</Header>
	);
};

export default ArtistProfilePageHeader;
