import { Header, HeaderSection, HeaderTitle } from '@organisms';
import React from 'react';

interface HomePageHeaderProps {}

const HomePageHeader: React.FC<HomePageHeaderProps> = () => {
	return (
		<Header>
			<HeaderSection CenterComponent={<HeaderTitle title='Home' />} />
		</Header>
	);
};

export default HomePageHeader;
