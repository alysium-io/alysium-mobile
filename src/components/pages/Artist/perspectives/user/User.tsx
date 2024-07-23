import { BasePage } from '@organisms';
import { ParallaxPageOutline } from '@templates';
import { ApiIdentifier } from '@types';
import React from 'react';
import SubHeader from '../../components/SubHeader';
import ActionButtons from './components/ActionButtons';
import useUserPage from './useUserPage';

interface UserProps {
	artist_uid: ApiIdentifier;
}

const User: React.FC<UserProps> = ({ artist_uid }) => {
	const { artistData } = useUserPage(artist_uid);
	console.log(artistData);
	if (!artistData) {
		return null;
	}

	return (
		<BasePage>
			<ParallaxPageOutline
				title={artistData.name}
				image={artistData.profile_image?.url}
			>
				<SubHeader />
				<ActionButtons />
			</ParallaxPageOutline>
		</BasePage>
	);
};

export default User;
