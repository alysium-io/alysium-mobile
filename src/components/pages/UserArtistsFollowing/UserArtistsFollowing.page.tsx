import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import Artists from './components/Artists';
import useUserArtistsFollowingPage from './useUserArtistsFollowingPage';

const UserArtistsFollowingPage = () => {
	const { userArtistsFollowingData } = useUserArtistsFollowingPage();

	if (!userArtistsFollowingData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView>
					<Artists userArtistsFollowingData={userArtistsFollowingData} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default UserArtistsFollowingPage;
