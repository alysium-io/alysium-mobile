import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import Tags from './components/Tags';
import useUserTagsFollowingPage from './useUserTagsFollowingPage';

const UserArtistsFollowingPage = () => {
	const { userTagsFollowingData } = useUserTagsFollowingPage();

	if (!userTagsFollowingData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView>
					<Tags userTagsFollowingData={userTagsFollowingData} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default UserArtistsFollowingPage;
