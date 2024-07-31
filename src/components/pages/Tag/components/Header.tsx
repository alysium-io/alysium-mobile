import { Text, View } from '@atomic';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { FollowButton } from '@molecules';
import { Stats } from '@organisms';
import React from 'react';

interface HeaderProps {
	tagData: FindOneTagResponseDto;
	onPressFollowButton: (isFollowing: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ tagData, onPressFollowButton }) => {
	return (
		<View margin='m'>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				marginTop='m'
				marginBottom='l'
			>
				<Text variant='page-header' marginBottom='m'>
					{tagData.name}
				</Text>
				<Stats
					items={[
						{
							title: tagData.num_followers.toLocaleString(),
							subtitle: 'follower' + (tagData.num_followers === 1 ? '' : 's'),
							onPress: () => {}
						}
					]}
				/>
			</View>
			<FollowButton
				defaultState={tagData.is_following}
				onChange={onPressFollowButton}
			/>
		</View>
	);
};

export default Header;
