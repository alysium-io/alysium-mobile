import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

const BottomButtons = () => {
	return (
		<View margin='m' flexDirection='row'>
			<View marginRight='s' flex={1}>
				<Button
					variant='outlined'
					colorVariant='negative'
					text='Decline'
					onPress={() => console.log('accept')}
				/>
			</View>
			<View marginLeft='s' flex={1}>
				<Button
					colorVariant='positive'
					text='Accept Contract'
					onPress={() => console.log('accept')}
				/>
			</View>
		</View>
	);
};

export default BottomButtons;
