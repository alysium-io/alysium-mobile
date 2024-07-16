import { View } from '@atomic';
import { ToggleButton } from '@molecules';
import React from 'react';

const ActionButtons = () => {
	return (
		<View margin='m'>
			<ToggleButton
				defaultState={true}
				onChange={(x) => console.log(x)}
				activeButtonProps={{
					text: 'Follow'
				}}
				inactiveButtonProps={{
					text: 'Following'
				}}
			/>
		</View>
	);
};

export default ActionButtons;
