import { Icon, View } from '@atomic';
import { MotiView } from 'moti';
import React from 'react';

const PersonaIsLoading = () => {
	return (
		<View
			flex={1}
			justifyContent='center'
			alignItems='center'
			backgroundColor='bg.p'
		>
			<MotiView
				from={{
					opacity: 0.2
				}}
				animate={{
					opacity: 1
				}}
				transition={{
					type: 'timing',
					duration: 2000,
					repeat: Infinity,
					repeatReverse: true
				}}
			>
				<Icon name='logo' size={50} color='bg.light' />
			</MotiView>
		</View>
	);
};

export default PersonaIsLoading;
