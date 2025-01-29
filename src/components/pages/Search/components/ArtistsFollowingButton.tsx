import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Role } from '@flux/api/user/user.entity';
import { ContentListItem } from '@molecules';
import { Props } from '@types';
import React from 'react';

interface ArtistsFollowingButtonProps extends Props<typeof ContentListItem> {}

const ArtistsFollowingButton: React.FC<ArtistsFollowingButtonProps> = (
	props
) => {
	const { userData, createAccountBottomSheetApi } = useUserAppContext();
	return (
		<ContentListItem
			{...props}
			onPress={
				userData.role === Role.guest
					? createAccountBottomSheetApi.open
					: props.onPress
			}
		/>
	);
};

export default ArtistsFollowingButton;
