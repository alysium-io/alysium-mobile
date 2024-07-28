import { View } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { FollowButton } from '@molecules';
import React from 'react';

interface ActionButtonsProps {
	artistData: PublicFindOneArtistResponseDto;
	onPressFollowButton: (isFollowing: boolean) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
	artistData,
	onPressFollowButton
}) => {
	return (
		<View margin='m'>
			<FollowButton
				defaultState={artistData.is_following}
				onChange={(isActive) => onPressFollowButton(isActive)}
			/>
		</View>
	);
};

export default ActionButtons;
