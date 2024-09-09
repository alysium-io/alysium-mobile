import { Icon, View } from '@atomic';
import React from 'react';

const EditIcon = () => {
	return (
		<View backgroundColor='bg.p' borderRadius='round' style={{ padding: 3 }}>
			<View
				backgroundColor='bg.negative.p'
				borderRadius='round'
				style={{ padding: 5 }}
			>
				<Icon name='pencil' size='s' color='text.negative.p' />
			</View>
		</View>
	);
};

export default EditIcon;
