import { Header, HeaderBackButton, HeaderSection } from '@organisms';
import React from 'react';

const HeaderWithBackButton = () => {
	return (
		<Header>
			<HeaderSection LeftComponent={<HeaderBackButton />} />
		</Header>
	);
};

export default HeaderWithBackButton;
