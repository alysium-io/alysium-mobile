import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { FindOneSceneResponseDto } from '@flux/api/scene/dto/find-one-scene.dto';
import { userScenesFollowingApiSlice } from '@flux/api/user-scenes-following';
import { Role } from '@flux/api/user/user.entity';
import { useToast, useToggle } from '@hooks';
import { Button, FollowButton } from '@molecules';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';

interface FollowSceneButtonProps {
	sceneData: FindOneSceneResponseDto;
}

const FollowSceneButton: React.FC<FollowSceneButtonProps> = ({ sceneData }) => {
	const { toastError } = useToast();
	const { behavior } = useBehaviorContext();
	const [userScenesFollowCreateMutation] =
		userScenesFollowingApiSlice.useCreateUserScenesFollowingMutation();
	const [userScenesFollowDeleteMutation] =
		userScenesFollowingApiSlice.useDeleteUserScenesFollowingMutation();
	const { userData, checkUserWantsToRegisterBottomSheet } = useUserAppContext();
	const followButtonToggleApi = useToggle(sceneData.is_following);

	const onPressFollowButton = async (isFollowing: boolean) => {
		if (!sceneData) return;
		if (isFollowing) {
			await userScenesFollowCreateMutation({
				body: {
					scene_uid: sceneData.scene_uid
				}
			})
				.unwrap()
				.then(() => {
					behavior('FOLLOW_SCENE', {
						scene_uid: sceneData.scene_uid
					}).catch(() => console.error('Error logging FOLLOW_SCENE behavior'));
				})
				.catch(() => {
					followButtonToggleApi.off();
					toastError();
				});
		} else {
			await userScenesFollowDeleteMutation({
				params: {
					scene_uid: sceneData.scene_uid
				}
			})
				.unwrap()
				.then(() => {
					behavior('UNFOLLOW_SCENE', {
						scene_uid: sceneData.scene_uid
					}).catch(() =>
						console.error('Error logging UNFOLLOW_SCENE behavior')
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

export default FollowSceneButton;
