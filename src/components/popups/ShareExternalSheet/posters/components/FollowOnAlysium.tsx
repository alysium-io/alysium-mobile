import { Icon, Text, View } from '@atomic';
import React from 'react';

const FollowOnAlysium = () => {
	return (
		<View
			flexDirection='row'
			justifyContent='center'
			alignItems='center'
			paddingHorizontal='xl'
		>
			<Icon name='logo' size='s' color='white' />
			<Text
				marginLeft='s'
				variant='paragraph-small'
				color='white'
				textDecorationLine='underline'
			>
				Follow on Alysium
			</Text>
		</View>
	);
};

export default FollowOnAlysium;
