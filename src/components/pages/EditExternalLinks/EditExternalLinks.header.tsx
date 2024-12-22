import { Header, HeaderBackButton, HeaderSection } from '@organisms';
import React from 'react';

interface EditExternalLinksPageHeaderProps {}

const EditExternalLinksPageHeader: React.FC<
	EditExternalLinksPageHeaderProps
> = () => {
	return (
		<Header>
			<HeaderSection LeftComponent={<HeaderBackButton />} />
		</Header>
	);
};

export default EditExternalLinksPageHeader;
