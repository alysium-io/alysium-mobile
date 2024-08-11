import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

const UserArtistsFollowingPageHeader: React.FC<StackHeaderProps> = () => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
			/>
		</Header>
	);
};

export default UserArtistsFollowingPageHeader;
