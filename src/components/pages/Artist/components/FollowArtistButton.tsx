import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { userArtistsFollowingApiSlice } from '@flux/api/user-artists-following';
import { Role } from '@flux/api/user/user.entity';
import { useToggle } from '@hooks';
import { Button, FollowButton } from '@molecules';
import { captureException } from '@sentry/react-native';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';
import Toast from 'react-native-toast-message';

interface FollowArtistButtonProps {
	artistData: PublicFindOneArtistResponseDto;
}

const FollowArtistButton: React.FC<FollowArtistButtonProps> = ({
	artistData
}) => {
	const { behavior } = useBehaviorContext();
	const [userArtistsFollowCreateMutation] =
		userArtistsFollowingApiSlice.useCreateUserArtistsFollowingMutation();
	const [userArtistsFollowDeleteMutation] =
		userArtistsFollowingApiSlice.useDeleteUserArtistsFollowingMutation();
	const followButtonToggleApi = useToggle(artistData.is_following);
	const { userData, createAccountBottomSheetApi } = useUserAppContext();

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
					}).catch((err) => captureException(err));
				})
				.catch((err) => {
					captureException(err);
					followButtonToggleApi.off();
					Toast.show({
						text1: 'Error',
						text2: 'Failed to follow artist.'
					});
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
					}).catch((err) => captureException(err));
				})
				.catch((err) => {
					captureException(err);
					followButtonToggleApi.on();
					Toast.show({
						text1: 'Error',
						text2: 'Failed to unfollow artist.'
					});
				});
		}
	};

	if (userData.role == Role.guest) {
		return <Button text='Follow' onPress={createAccountBottomSheetApi.open} />;
	}

	return (
		<FollowButton
			toggleApi={followButtonToggleApi}
			onChange={onPressFollowButton}
		/>
	);
};

export default FollowArtistButton;
