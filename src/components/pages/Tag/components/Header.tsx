import { Text, View } from '@atomic';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { FollowButton } from '@molecules';
import React from 'react';

interface HeaderProps {
	tagData: FindOneTagResponseDto;
	onPressFollowButton: (isFollowing: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ tagData, onPressFollowButton }) => {
	return (
		<View margin='m'>
			<Text variant='page-header' marginBottom='m'>
				{tagData.name}
			</Text>
			<FollowButton
				defaultState={tagData.is_following}
				onChange={onPressFollowButton}
			/>
		</View>
	);
};

export default Header;
