import { Text, View } from '@atomic';
import { FindOneTagResponseDto } from '@flux/api/tag/dto/tag-find-one.dto';
import { FollowButton } from '@molecules';
import React from 'react';

interface HeaderProps {
	tagData: FindOneTagResponseDto;
}

const Header: React.FC<HeaderProps> = ({ tagData }) => {
	return (
		<View margin='m'>
			<Text variant='page-header' marginBottom='m'>
				{tagData.name}
			</Text>
			<FollowButton defaultState={true} onChange={(x) => console.log(x)} />
		</View>
	);
};

export default Header;
