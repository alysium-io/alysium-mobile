import { View } from '@atomic';
import { ToggleButton } from '@molecules';
import React, { useState } from 'react';

const ActionButtons = () => {
	const [state, setState] = useState(false);

	return (
		<View margin='m'>
			<ToggleButton
				value={state}
				text='Follow'
				inactiveText='Following'
				onPress={() => setState(!state)}
			/>
		</View>
	);
};

export default ActionButtons;
