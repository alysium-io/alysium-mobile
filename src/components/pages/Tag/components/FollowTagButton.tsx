import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { userTagsFollowingApiSlice } from '@flux/api/user-tags-following';
import { Role } from '@flux/api/user/user.entity';
import { useToast, useToggle } from '@hooks';
import { Button, FollowButton } from '@molecules';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';

interface FollowTagButtonProps {
	tagData: FindOneTagResponseDto;
}

const FollowTagButton: React.FC<FollowTagButtonProps> = ({ tagData }) => {
	const { toastError } = useToast();
	const { behavior } = useBehaviorContext();
	const [userTagsFollowCreateMutation] =
		userTagsFollowingApiSlice.useCreateUserTagsFollowingMutation();
	const [userTagsFollowDeleteMutation] =
		userTagsFollowingApiSlice.useDeleteUserTagsFollowingMutation();
	const followButtonToggleApi = useToggle(tagData.is_following);
	const { userData, checkUserWantsToRegisterBottomSheet } = useUserAppContext();

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
					}).catch(() => console.error('Error logging FOLLOW_TAG behavior'));
				})
				.catch(() => {
					followButtonToggleApi.off();
					toastError();
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
					}).catch(() => console.error('Error logging UNFOLLOW_TAG behavior'));
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

export default FollowTagButton;
