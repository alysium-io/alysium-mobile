import { View } from '@atomic';
import { BasePage } from '@organisms';
import { ParallaxPageOutline } from '@templates';
import { ApiIdentifier } from '@types';
import React from 'react';
import SubHeader from '../../components/SubHeader';
import ActionButtons from './components/ActionButtons';
import ArtistTags from './components/ArtistTags';
import useUserPage from './useUserPage';

interface UserProps {
	artist_uid: ApiIdentifier;
}

const User: React.FC<UserProps> = ({ artist_uid }) => {
	const { artistData, onPressFollowButton } = useUserPage(artist_uid);

	if (!artistData) {
		return null;
	}

	return (
		<BasePage>
			<ParallaxPageOutline
				title={artistData.name}
				image={artistData.profile_image?.url}
			>
				<View margin='m'>
					<SubHeader artistData={artistData} />
					<ActionButtons
						artistData={artistData}
						onPressFollowButton={onPressFollowButton}
					/>
					<ArtistTags artistData={artistData} />
				</View>
			</ParallaxPageOutline>
		</BasePage>
	);
};

export default User;
