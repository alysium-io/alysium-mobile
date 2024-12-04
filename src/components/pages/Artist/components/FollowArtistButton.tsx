import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { userArtistsFollowingApiSlice } from '@flux/api/user-artists-following';
import { Role } from '@flux/api/user/user.entity';
import { useToast, useToggle } from '@hooks';
import { Button, FollowButton } from '@molecules';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';

interface FollowArtistButtonProps {
	artistData: PublicFindOneArtistResponseDto;
}

const FollowArtistButton: React.FC<FollowArtistButtonProps> = ({
	artistData
}) => {
	const { toastError } = useToast();
	const { behavior } = useBehaviorContext();
	const [userArtistsFollowCreateMutation] =
		userArtistsFollowingApiSlice.useCreateUserArtistsFollowingMutation();
	const [userArtistsFollowDeleteMutation] =
		userArtistsFollowingApiSlice.useDeleteUserArtistsFollowingMutation();
	const followButtonToggleApi = useToggle(artistData.is_following);
	const { userData, checkUserWantsToRegisterBottomSheet } = useUserAppContext();

	const onPressFollowButton = async (isFollowing: boolean) => {
		if (!artistData) return;
		if (isFollowing) {
			await userArtistsFollowCreateMutation({
				body: {
					artist_uid: artistData.artist_uid
				}
			})
				.unwrap()
				.then(() => {
					behavior('FOLLOW_ARTIST', {
						artist_uid: artistData.artist_uid
					}).catch(() => console.error('Error logging FOLLOW_ARTIST behavior'));
				})
				.catch(() => {
					followButtonToggleApi.off();
					toastError();
				});
		} else {
			await userArtistsFollowDeleteMutation({
				params: {
					artist_uid: artistData.artist_uid
				}
			})
				.unwrap()
				.then(() => {
					behavior('UNFOLLOW_ARTIST', {
						artist_uid: artistData.artist_uid
					}).catch(() =>
						console.error('Error logging UNFOLLOW_ARTIST behavior')
					);
				})
				.catch(() => {
					followButtonToggleApi.on();
					toastError();
				});
		}
	};

	if (userData.role == Role.guest) {
		return (
			<Button
				text='Follow'
				onPress={checkUserWantsToRegisterBottomSheet.open}
			/>
		);
	}

	return (
		<FollowButton
			toggleApi={followButtonToggleApi}
			onChange={onPressFollowButton}
		/>
	);
};

export default FollowArtistButton;
