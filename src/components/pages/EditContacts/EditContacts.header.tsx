import {
	Header,
	HeaderBackButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface EditContactsPageHeaderProps {}

const EditContactsPageHeader: React.FC<EditContactsPageHeaderProps> = () => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderBackButton />}
				CenterComponent={
					<HeaderTitle
						title='Contacts'
						titleProps={{ variant: 'paragraph-small', color: 'text.q' }}
					/>
				}
			/>
		</Header>
	);
};

export default EditContactsPageHeader;
