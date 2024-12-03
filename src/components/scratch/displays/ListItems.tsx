import { useToggle } from '@hooks';
import { ListItemWithRadio } from '@molecules';
import React from 'react';

const ListItems = () => {
	const { state, toggle } = useToggle();
	return (
		<ListItemWithRadio
			id='1'
			radioButtonProps={{
				active: state,
				onPress: toggle
			}}
			titleTextProps={{
				title: 'ListItemWithRadio',
				topSubtext: 'top subtext',
				bottomSubtext:
					'bottom subtext that is super long and that i can definitely wrap because im super smart and awesome',
				wrapBottomSubtext: false
			}}
		/>
	);
};

export default ListItems;
