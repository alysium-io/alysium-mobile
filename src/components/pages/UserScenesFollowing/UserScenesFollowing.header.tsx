import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

const UserArtistsFollowingPageHeader: React.FC = () => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={<HeaderTitle title='Scenes Following' />}
			/>
		</Header>
	);
};

export default UserArtistsFollowingPageHeader;
