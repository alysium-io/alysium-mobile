import { View } from '@atomic';
import { FollowButton } from '@molecules';
import React from 'react';

const ActionButtons = () => {
	return (
		<View margin='m'>
			<FollowButton defaultState={true} onChange={(x) => console.log(x)} />
		</View>
	);
};

export default ActionButtons;
