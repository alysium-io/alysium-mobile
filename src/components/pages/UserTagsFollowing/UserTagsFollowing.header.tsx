import { useNavigation } from '@hooks';
import { Header, HeaderIconButton } from '@organisms';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

const UserArtistsFollowingPageHeader: React.FC<StackHeaderProps> = () => {
	const { back } = useNavigation();
	return (
		<Header
			LeftComponent={<HeaderIconButton onPress={back} icon='arrow-left' />}
			CenterComponent={undefined}
			RightComponent={undefined}
		/>
	);
};

export default UserArtistsFollowingPageHeader;
