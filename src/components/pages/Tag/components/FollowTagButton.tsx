import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { userTagsFollowingApiSlice } from '@flux/api/user-tags-following';
import { Role } from '@flux/api/user/user.entity';
import { useToggle } from '@hooks';
import { Button, FollowButton } from '@molecules';
import { captureException } from '@sentry/react-native';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';
import Toast from 'react-native-toast-message';

interface FollowTagButtonProps {
	tagData: FindOneTagResponseDto;
}

const FollowTagButton: React.FC<FollowTagButtonProps> = ({ tagData }) => {
	const { behavior } = useBehaviorContext();
	const [userTagsFollowCreateMutation] =
		userTagsFollowingApiSlice.useCreateUserTagsFollowingMutation();
	const [userTagsFollowDeleteMutation] =
		userTagsFollowingApiSlice.useDeleteUserTagsFollowingMutation();
	const followButtonToggleApi = useToggle(tagData.is_following);
	const { userData, createAccountBottomSheetApi } = useUserAppContext();

	const onPressFollowButton = async (isFollowing: boolean) => {
		if (!tagData) return;
		if (isFollowing) {
			await userTagsFollowCreateMutation({
				body: {
					tag_uid: tagData.tag_uid
				}
			})
				.unwrap()
				.then(() => {
					behavior('FOLLOW_TAG', {
						tag_uid: tagData.tag_uid
					}).catch((err) => captureException(err));
				})
				.catch((err) => {
					captureException(err);
					followButtonToggleApi.off();
					Toast.show({
						text1: 'Error',
						text2: 'Failed to follow tag.'
					});
				});
		} else {
			await userTagsFollowDeleteMutation({
				params: {
					tag_uid: tagData.tag_uid
				}
			})
				.unwrap()
				.then(() => {
					behavior('UNFOLLOW_TAG', {
						tag_uid: tagData.tag_uid
					}).catch((err) => captureException(err));
				})
				.catch((err) => {
					captureException(err);
					followButtonToggleApi.on();
					Toast.show({
						text1: 'Error',
						text2: 'Failed to unfollow tag.'
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

export default FollowTagButton;
