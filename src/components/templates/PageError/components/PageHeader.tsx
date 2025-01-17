import { Header, HeaderBackButton, HeaderSection } from '@organisms';
import React from 'react';

const PageHeader = () => {
	return (
		<Header>
			<HeaderSection LeftComponent={<HeaderBackButton />} />
		</Header>
	);
};

export default PageHeader;
