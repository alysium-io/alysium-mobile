import { Header, HeaderTitle } from '@organisms';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

const ProfilePageHeader: React.FC<StackHeaderProps> = (stackHeaderProps) => {
	return (
		<Header
			stackHeaderProps={stackHeaderProps}
			LeftComponent={undefined}
			CenterComponent={() => <HeaderTitle title='account' />}
			RightComponent={undefined}
		/>
	);
};

export default ProfilePageHeader;
