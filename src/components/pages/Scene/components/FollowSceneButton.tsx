import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { FindOneSceneResponseDto } from '@flux/api/scene/dto/find-one-scene.dto';
import { userScenesFollowingApiSlice } from '@flux/api/user-scenes-following';
import { Role } from '@flux/api/user/user.entity';
import { useToggle } from '@hooks';
import { Button, FollowButton } from '@molecules';
import { captureException } from '@sentry/react-native';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';
import Toast from 'react-native-toast-message';

interface FollowSceneButtonProps {
	sceneData: FindOneSceneResponseDto;
}

const FollowSceneButton: React.FC<FollowSceneButtonProps> = ({ sceneData }) => {
	const { behavior } = useBehaviorContext();
	const [userScenesFollowCreateMutation] =
		userScenesFollowingApiSlice.useCreateUserScenesFollowingMutation();
	const [userScenesFollowDeleteMutation] =
		userScenesFollowingApiSlice.useDeleteUserScenesFollowingMutation();
	const { userData, createAccountBottomSheetApi } = useUserAppContext();
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
					}).catch((err) => captureException(err));
				})
				.catch((err) => {
					captureException(err);
					followButtonToggleApi.off();
					Toast.show({
						text1: 'Error',
						text2: 'Failed to follow scene.'
					});
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
					});
				})
				.catch((err) => {
					captureException(err);
					followButtonToggleApi.on();
					Toast.show({
						text1: 'Error',
						text2: 'Failed to unfollow scene.'
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

export default FollowSceneButton;
