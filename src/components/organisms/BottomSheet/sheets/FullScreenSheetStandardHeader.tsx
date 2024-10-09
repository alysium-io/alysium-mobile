import { Header, HeaderSection } from '@organisms';
import React from 'react';
import CancelXButton from './CancelXButton';

const FullScreenSheetStandardHeader = () => {
	return (
		<Header>
			<HeaderSection LeftComponent={<CancelXButton />} />
		</Header>
	);
};

export default FullScreenSheetStandardHeader;
