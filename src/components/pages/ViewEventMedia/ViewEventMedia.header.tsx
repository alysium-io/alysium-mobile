import {
	Header,
	HeaderBackButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface ViewEventMediaHeaderProps {
	title: string;
}

const ViewEventMediaHeader: React.FC<ViewEventMediaHeaderProps> = ({
	title
}) => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderBackButton />}
				CenterComponent={<HeaderTitle title={title} />}
			/>
		</Header>
	);
};

export default ViewEventMediaHeader;
