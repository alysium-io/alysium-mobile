import { View } from '@atomic';
import { useAuth } from '@hooks';
import { Button } from '@molecules';
import React from 'react';

const LogoutSection = () => {
	const { logout } = useAuth();

	return (
		<View margin='m'>
			<Button
				variant='outlined'
				colorVariant='negative'
				text='Logout'
				onPress={logout}
			/>
		</View>
	);
};

export default LogoutSection;
