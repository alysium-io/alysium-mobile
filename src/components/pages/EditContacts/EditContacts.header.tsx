import { Header, HeaderBackButton, HeaderSection } from '@organisms';
import React from 'react';

interface EditContactsPageHeaderProps {}

const EditContactsPageHeader: React.FC<EditContactsPageHeaderProps> = () => {
	return (
		<Header>
			<HeaderSection LeftComponent={<HeaderBackButton />} />
		</Header>
	);
};

export default EditContactsPageHeader;
